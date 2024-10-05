const ChartOfAccountsdb = require("../model/ChartOfAccounts/ChartOfAccounts");
const Clientdb = require("../model/Client/client");
const Companiessdb = require("../model/Companies/Companies");
const SaleItemdb = require("../model/Sales/SaleItem")
const Salesdb = require("../model/Sales/Sales");
const Userdb = require("../model/Users/Users");

exports.addSale = async (req, res) => {

    try{

        var items_id = [];

        for (const saleItem of req.body.saleItems){
            const save_item = await SaleItemdb.create({
                amount: saleItem.amount,
                tax_rate: saleItem.tax_rate,
                account: saleItem.account_id,
                discount_percentage: saleItem.discount_percentage,
                unit_price: saleItem.unit_price,
                qty: saleItem.qty,
                description: saleItem.description,
                unique_id: saleItem.unique_id,
                product: saleItem.product,
            })
            items_id.push(save_item._id)
        }
        
        Salesdb.create({
            client_id: req.body.saleData.to,
            date: req.body.saleData.date,
            due_date: req.body.saleData.dueDate,
            jobDate: req.body.saleData.jobDate,
            invoice_no: req.body.saleData.invoiceNo,
            currency: req.body.saleData.currency,
            subtotal: req.body.totalData.subTotal,
            tax: req.body.totalData.tax,
            discount: req.body.totalData.disc,
            total: req.body.totalData.total,
            saleitem_id: items_id,
            status: req.body.saleData.status,
            note: "",
            source: req.body.saleData.source,
            company_id: req.body.saleData.company_id
        }).then(
            res.status(200).json({
                message: "Sale Added Successfully"
            })
        )
    } catch (err) {
        console.error('Error:', err)
    }
}

exports.deleteSale = async (req, res) => {
    const id = req.params.id;
    try{
        const sales = Salesdb.findOne({_id: id}); 
        SaleItemdb.deleteMany({ _id: { $in: sales.saleitem_id } })

        Salesdb.findByIdAndDelete(id).then(
            res.status(200).json({
                message: "Sale Deleted Successfully"
            })
        )
    } catch (err) {
        console.error('Error:', err)
    }
}

exports.editSale = async (req, res) => {
    try{
        const id = req.params.id;
        
        const sales = Salesdb.findOne({_id: id}); 
        SaleItemdb.deleteMany({ _id: { $in: sales.saleitem_id } })

        var items_id = [];

        for (const saleItem of req.body.saleItems){
            const save_item = await SaleItemdb.create({
                amount: saleItem.amount,
                tax_rate: saleItem.tax_rate,
                account: saleItem.account_id,
                discount_percentage: saleItem.discount_percentage,
                unit_price: saleItem.unit_price,
                qty: saleItem.qty,
                description: saleItem.description,
                unique_id: saleItem.unique_id,
                product: saleItem.product,
                jobHolder: saleItem.jobHolder
            })
            items_id.push(save_item._id)
        }
        
        Salesdb.findByIdAndUpdate(id, {
            client_id: req.body.saleData.to,
            date: req.body.saleData.date,
            due_date: req.body.saleData.dueDate,
            jobDate: req.body.saleData.jobDate,
            invoice_no: req.body.saleData.invoiceNo,
            currency: req.body.saleData.currency,
            subtotal: req.body.totalData.subTotal,
            tax: req.body.totalData.tax,
            discount: req.body.totalData.disc,
            total: req.body.totalData.total,
            saleitem_id: items_id,
            status: req.body.saleData.status,
            source: req.body.saleData.source,
            company_id: req.body.saleData.company_id,
        }).then(
            res.status(200).json({
                message: "Sale Edited Successfully"
            })
        )
    } catch (err) {
        console.error('Error:', err)
    }
}

exports.getAllSale = async (req, res) => {
    const sales = await Salesdb.find().sort({_id: -1}).populate('client_id').populate("company_id").populate({
        path: 'saleitem_id',
        populate: {
          path: 'account'
        }
      });
      var modifiedSales = [];

      if(sales){
          modifiedSales = sales.map(sale => {
                  if(sale.saleitem_id)
                  {
                if(sale.saleitem_id !== "" && sale.saleitem_id.length !== 0){
                const modifiedSaleitem = sale.saleitem_id.map(item => {
                        const account = item.account;
                        if(account){
                            const formattedAccount = { value: account._id, label: `${account.code} - ${account.name}` };
                            return { ...item.toObject(), account: formattedAccount };
                        }
                        else return { ...item.toObject(), account: null };
                    });
                    
                    return { ...sale.toObject(), saleitem_id: modifiedSaleitem };
                }
                else return { ...sale.toObject(), saleitem_id: "null" };
            }
            else return { ...sale.toObject(), saleitem_id: null };
        });
      }

    
    const users_all = await Userdb.find({ isActive: true }).populate('role_id');

    const users = users_all.filter((user) => {
        return user.role_id && user.role_id.pages.some((page) => {
          return page.name === 'Sales Page' && page.isChecked;
        });
      });

    const clients = await Clientdb.find();
    const COA = await ChartOfAccountsdb.find();
    var invoice_no = '1';

    if (sales.length !== 0){
        invoice_no = +invoice_no + +sales[0].invoice_no
    }
     
    if (!sales) {
        return res.status(400).json({
            message: "Some Error, Please try again later",
        })
    }

    var companies = await Companiessdb.find();

    var response = {
        sales: modifiedSales,
        clients,
        users,
        invoice_no,
        COA,
        companies
    }

    res.json(response);
}

exports.getOneSale = async (req, res) => {
    try{
        ProjectNameDb.create({
            name: req.body.name
        }).then(
            res.status(200).json({
                message: "Project Name Created Successfully"
            })
        )
    } catch (err) {
        console.error('Error:', err)
    }
}

exports.editOneSaleNote = async (req, res) => {
    try{

        const id = req.params.id;
        await Salesdb.findByIdAndUpdate(id, {
            note: req.body.note,
            jobHolder: req.body.jobHoldersorry,
        })

        res.status(200).json({
            message: "Sale Note Edited Successfully"
        })

    } catch (err) {
        console.error('Error:', err)
    }
}

exports.editOneSaleAsPaid = async (req, res) => {
    try{

        const id = req.params.id;
        await Salesdb.findByIdAndUpdate(id, {
            status: "Paid",
            paidDate: new Date(),
        })

        res.status(200).json({
            message: "Sale Note Edited Successfully"
        })

    } catch (err) {
        console.error('Error:', err)
    }
}
