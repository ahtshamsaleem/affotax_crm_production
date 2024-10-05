const Clientdb = require('../model/Client/client');
const Notidb = require('../model/Notifications/Notifications');
const Templatesdb = require('../model/Templates/Templates');
const MessageIdsDb = require('../model/Tickets/MessageIds');
const Ticketsdb = require('../model/Tickets/Tickets');
const Userdb = require('../model/Users/Users');
var gmail = require('./GmailApi')

exports.getEmails = async (req, res) => {
    
    try{
        const userId = req.user._id
        const Clients = await Clientdb.find();

        Clients.sort((a, b) => {
            const companyNameA = a.company_name.toLowerCase();
            const companyNameB = b.company_name.toLowerCase();
          
            if (companyNameA < companyNameB) {
              return -1;
            } else if (companyNameA > companyNameB) {
              return 1;
            } else {
              return 0;
            }
          });

        const User = await Userdb.findById(userId).populate('role_id');

       

        var Tickets = [];
        var UsersList = []
        var templatesList = [];

        if( User.role_id.name === 'Admin'){
            Tickets = await Ticketsdb.find({isOpen: true}).populate('client_id').populate("user_id");
            const User_all = await Userdb.find().populate('role_id');
            templatesList = await Templatesdb.find();
            UsersList = User_all.filter((user) => {
                return user.role_id && user.role_id.pages.some((page) => {
                  return page.name === 'Tickets Page' && page.isChecked;
                });
              });
        }
        else{
            Tickets = await Ticketsdb.find({user_id: userId}).populate('client_id').populate("user_id");
            templatesList = await Templatesdb.find({ users_list: { $in: [userId] } });
            UsersList.push(User);
        }

        TicketsList = await Tickets.map(ticket => ({ 
            thread_id: ticket.mail_thread_id,
            company_name: ticket.company_name ? ticket.company_name : "Affotax"
        }))
        
        
        var Emails = await gmail.getAllEmails(TicketsList);
                
        Emails.detailedThreads.forEach(async email => {
            const matchingTicket = Tickets.find(ticket => ticket.mail_thread_id === email.threadId);
            if (matchingTicket) {
                email.decryptedMessages.map(async oneEma => {
                    
                    
                    const existingMessage = await MessageIdsDb.findOne({
                        ticket_id: matchingTicket._id.toString(),
                        message_id: oneEma.id,
                        mail_thread_id: matchingTicket.mail_thread_id
                    });

                    if (!existingMessage) {
                        await MessageIdsDb.create({
                            ticket_id: matchingTicket._id.toString(),
                            message_id: oneEma.id,
                            mail_thread_id: matchingTicket.mail_thread_id
                        });

                        const ureadEmail = email.decryptedMessages.find(unreadEmail => unreadEmail.id === oneEma.id)
                        if(ureadEmail && ureadEmail.labelIds.includes('UNREAD')){
                            Notidb.create({
                                title: "Reply to a ticket received",
                                description: `You've received a response to a ticket with the subject "${email.subject}" from the company named "${email.ticketInfo.client_id.company_name}" and the client's name is "${email.ticketInfo.client_id.client_name}".`,
                                redirectLink: `/tickets?ticket_id=${matchingTicket._id.toString()}`,
                                user_id: email.ticketInfo.user_id._id
                            })
                        }
                    }

                  })
            }
          });

                
          Emails.detailedThreads = await Promise.all(Emails.detailedThreads.map(async email => {
            const matchingTicket = Tickets.find(ticket => ticket.mail_thread_id === email.threadId);
            
            if (matchingTicket) {
              email.ticketInfo = matchingTicket;
          
              email.decryptedMessages = await Promise.all(email.decryptedMessages.map(async mail => {
                const matchingMessageData = await MessageIdsDb.findOne({ message_id: mail.id });
                
                if (matchingMessageData && matchingMessageData.messageSentBy) {
                  mail.messageSentBy = matchingMessageData.messageSentBy;
                }
                
                return mail;
              }));
            }
          
            return email;
          }));
          


        const resp = {
            Emails,
            UsersList,
            templatesList,
            Clients
        }
            
        res.json(resp)

    } catch(err) {
        res.status(500).json({
            message: "Fail",
            data: err.message
        })
    }

}

exports.markAsRead = async (req, res) => {
    
    try{

        const messageId = req.params.id;
        const company_name = req.params.cn;
        
        await gmail.markThreadAsRead(messageId, company_name);
            
          res.json({
            message: "Success",
            data: "Mail Read Successfully"
        })

    } catch(err) {
        res.status(500).json({
            message: "Fail",
            data: err.message
        })
    }

}

exports.createNewTicket = async (req, res) => {
    
    try{
        const ClientId = req.body.formData.clientId
        const userName = req.user.name

        const client = await Clientdb.findById(ClientId);

        var company_email = "";

        if(req.body.formData.company_name === 'Affotax'){
            company_email = "info@affotax.com";
        } else if(req.body.formData.company_name === "Outsource") {
            company_email = "admin@outsourceaccountings.co.uk";
        } else if(req.body.formData.company_name === "Online Taxation") {
            company_email = "rashid@onlinetaxation.co.uk";
        } 
        
        const EmailData = {
            email: client.email,
            subject: req.body.formData.subject,
            message: req.body.formData.message,
            company_name: req.body.formData.company_name,
            company_email: company_email
        }
    
        const resp = await gmail.sendEmail(EmailData);

        const userId = req.user._id
        const ThreadId = resp.data.threadId
        
        

        await Ticketsdb.create({
            client_id: ClientId,
            user_id: userId,
            mail_thread_id: ThreadId,
            company_name: req.body.formData.company_name,
            company_email: company_email,
            lastMessageSentBy: userName
        })

        res.json({
            message: "Success",
            data: "Mail Sent Successfully"
        })

    } catch(err) {
        res.status(500).json({
            message: "Fail",
            data: err.message
        })
    }

}

exports.EditOneTicket = async (req, res) => {
    
    try{
        const tickedId = req.params.id;
        const userId = req.body.user_id;
        const curUserName = req.user.name;

        const ticket = await Ticketsdb.findById(tickedId)
        const client_id = ticket.client_id;
        const prevUserId = ticket.user_id;

        const client = await Clientdb.findOne({_id:client_id});
        const ClientName = client.client_name;
        const CompanyName = client.company_name;


        await Ticketsdb.findByIdAndUpdate(tickedId, {
            user_id: userId,
            note: req.body.note,
            job_date: req.body.job_date
        });

        if(prevUserId !== userId){
            await Notidb.create({
                title: "New Ticket Assigned",
                description: `${curUserName} Assigned you a new ticket of "${ClientName}", and Company Name is "${CompanyName}`,
                redirectLink: `/tickets?ticket_id=${tickedId.toString()}`,
                user_id: userId
            })
        }
        
        res.json({
            message: "Success",
            data: "User Changed Successfully"
        })

    } catch(err) {
        res.status(500).json({
            message: "Fail",
            data: err.message
        })
    }

}

exports.createNewTicketWithAttachments = async (req, res) => {
    
    try{

        const userName = req.user.name
        const ClientId = req.body.clientId
        const client = await Clientdb.findById(ClientId);

        var company_email = "";

        if(req.body.company_name === 'Affotax'){
            company_email = "info@affotax.com";
        } else if(req.body.company_name === "Outsource") {
            company_email = "admin@outsourceaccountings.co.uk";
        } else if(req.body.company_name === "Online Taxation") {
            company_email = "rashid@onlinetaxation.co.uk";
        } 
        

        const attachments = req.files.map(file => ({
            filename: file.originalname,
            content: file.buffer.toString('base64')
        }));

        
        const EmailData = {
            email: client.email,
            subject: req.body.subject,
            message: req.body.message,
            attachments: attachments,
            company_name: req.body.company_name,
            company_email: company_email
        }
    
        const resp = await gmail.sendEmailWithAttachments(EmailData);

        const userId = req.user._id
        const ThreadId = resp.data.threadId
        

        await Ticketsdb.create({
            client_id: ClientId,
            user_id: userId,
            mail_thread_id: ThreadId,
            company_name: req.body.company_name,
            company_email: company_email,
            lastMessageSentBy: userName
        })

        res.json({
            message: "Success",
            data: "Mail Sent Successfully"
        })

    } catch(err) {
        res.status(500).json({
            message: "Fail",
            data: err.message
        })
    }

}

exports.replyToTicketWithAttachment = async (req, res) => {
    
    try{

        const userName = req.user.name
        
        const threadId = req.body.threadId
        const messageId = req.body.messageId
        const subjectToReply = req.body.subjectToReply
        const emailSendTo = req.body.emailSendTo
        const company_name = req.body.company_name
        const company_email = req.body.company_email

        const attachments = req.files.map(file => ({
            filename: file.originalname,
            content: file.buffer.toString('base64')
        }));
        
        const EmailData = {
            threadId: threadId,
            messageId: messageId,
            subjectToReply: subjectToReply,
            emailSendTo: emailSendTo,
            message: req.body.message,
            attachments: attachments,
            company_name: company_name,
            company_email: company_email,
        }
    
        await gmail.replyToThreadWithAttachment(EmailData);

        await Ticketsdb.findOneAndUpdate({mail_thread_id: threadId}, {
            lastMessageSentBy: userName
        });

        res.json({
            message: "Success",
            data: "Reply Sent Successfully"
        })

    } catch(err) {
        res.status(500).json({
            message: "Fail",
            data: err.message
        })
    }

}

exports.replyToTicket = async (req, res) => {
    
    try{

        const userName = req.user.name

        const threadId = req.body.formData.threadId
        const messageId = req.body.formData.messageId
        const subjectToReply = req.body.formData.subjectToReply
        const emailSendTo = req.body.formData.emailSendTo
        const company_name = req.body.formData.company_name
        const company_email = req.body.formData.company_email
        
        const EmailData = {
            threadId: threadId,
            messageId: messageId,
            subjectToReply: subjectToReply,
            emailSendTo: emailSendTo,
            message: req.body.formData.message,
            company_name: company_name,
            company_email: company_email,
        }
    
        const gmailResp = await gmail.replyToThread(EmailData);

        

        const ticketData = await Ticketsdb.findOneAndUpdate({mail_thread_id: threadId}, {
            lastMessageSentBy: userName
        });

        const newMessageId = gmailResp.data.id;
        const newThreadId = gmailResp.data.threadId;
        const newTicketId = ticketData._id.toString();
        const messageSentBy = userName;

        MessageIdsDb.create({
            ticket_id: newTicketId,
            message_id: newMessageId,
            messageSentBy: messageSentBy,
            mail_thread_id: newThreadId,
        })

        res.json({
            message: "Success",
            data: "Reply Sent Successfully"
        })

    } catch(err) {
        res.status(500).json({
            message: "Fail",
            data: err.message
        })
    }

}

exports.markAsCompleted = async (req, res) => {
    
    try{

        const tickedId = req.params.id;
        
        await Ticketsdb.findByIdAndUpdate(tickedId, {
            isOpen: false
        });
            
          res.json({
            message: "Success",
            data: "Mail Completed Successfully"
        })

    } catch(err) {
        res.status(500).json({
            message: "Fail",
            data: err.message
        })
    }

}

exports.DeleteTicket = async (req, res) => {
    
    try{

        const tickedId = req.params.id;
        
        await Ticketsdb.findByIdAndDelete(tickedId);
            
          res.json({
            message: "Success",
            data: "Mail Deleted Successfully"
        })

    } catch(err) {
        res.status(500).json({
            message: "Fail",
            data: err.message
        })
    }

}

exports.DownloadAttachment = async (req, res) => {
    
    try{

        const attachmentId = req.params.id;
        const messageId = req.params.mid;
        const company_name = req.params.cn;
        
        const resp = await gmail.getAttachment(attachmentId, messageId, company_name);
    
        // Send the attachment data in the response
        res.send(resp);
            

    } catch(err) {
        console.error('Error downloading attachment:', err);
        res.status(500).send('Error downloading attachment.');
    }

}