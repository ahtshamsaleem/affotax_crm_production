// Imports

const multer = require('multer');

// Multer configuration
const upload = multer({ storage: multer.memoryStorage() });

const express = require('express');
const route = express.Router();


const UserController = require('../controller/UserController')
const JobController = require('../controller/JobController')
const TimerController = require('../controller/TimerController')
const LeadController = require('../controller/LeadController')
const RolesController = require('../controller/RolesController')
const TasksController = require('../controller/TasksController')
const QuickNotesController = require('../controller/QuickNotesController')
const SalesController = require('../controller/SalesController')
const ConstructionController = require('../controller/ConstructionController')
const TemplateController = require('../controller/TemplateController')
const GoalsController = require('../controller/GoalsController')
const TicketsController = require('../controller/TicketsController')


const authMiddleware = require('../middlewares/authMiddleware');
const { addOneChartOfAccounts, getAllChartOfAccounts } = require('../controller/ChartOfAccountsController');
const { getAttendanceSheet } = require('../controller/HrController');
const { GetAllRecurringTasks, AddOneRecurringTasksCategory, AddOneRecurringTasks, CheckOneRecurringTasks, DeleteOneRecurringTasks, DeleteOneTaskCategory } = require('../controller/RecurringTasksController');
const { getDashboardData } = require('../controller/DashboardController');
const { GetAllNotifications, MarkAllAsRead, MarkOneAsRead } = require('../controller/NotificationsController');
const { getAllCompanies, editCompany, addCompany, deleteCompany } = require('../controller/CompaniesController');
const { addPageForRole } = require('../controller/RolesPermissionsController');
const { getAllProposals, deleteProposals, editProposals, addProposals, copyProposals } = require('../controller/ProposalsController');
const { getAllUserRecurringTasks, addOneUserRecurringTasks, editOneUserRecurringTasks, deleteOneUserRecurringTasks, copyOneUserRecurringTasks, markCompleteOneUserRecurringTasks } = require('../controller/UserTaskRecurringController');
const { getAllValues } = require('../controller/SearchController');
const { GetMyListPreData } = require('../controller/MyListController');
const { addEditUserList } = require('../controller/UserListController');

// Api Routes
route.get('/', (req, res)=>{
    res.send('Hello World');
});


//auth
route.get('/users/get/all', UserController.getUsers )
route.post('/users/add', UserController.createUser )
route.post('/login', UserController.login )
route.get('/users/roles/get', authMiddleware, UserController.getUserRoles )
route.get('/users/get/one/:id', UserController.getOneUser )
route.post('/users/edit/one/:id', UserController.editUser )
route.get('/users/delete/one/:id', UserController.deleteUser )
route.post('/users/one/inactive/:id', UserController.inactiveUser )

//DashBoard
route.post('/admin/dashoard/get', getDashboardData )

//job
route.get('/job/add/predata', JobController.addNewClientPreData )
route.get('/job/get/all', JobController.getJobPlanning )
route.post('/job/client/add', JobController.addNewClient )
route.post('/job/planing/edit', authMiddleware, JobController.editJobPlanning )
route.post('/job/planing/edit/many', JobController.editManyJobPlanning )


//Clients
route.get('/clients/get/all', JobController.getAllClients )
route.get('/client/get/one/predata/:id', JobController.getOneClient )
route.post('/client/one/update/:id', JobController.updateOneClient )
route.get('/client/one/delete/:id', JobController.deleteOneClient )
route.post('/client/one/active/inactive/:id', JobController.activeInactive )

//Timer
route.get('/timer/check', authMiddleware, TimerController.getTimerState)
route.post('/timer/start_stop', authMiddleware, TimerController.startStopTimer)
route.get('/timer/report', authMiddleware, TimerController.getTimerReport)
route.post('/timer/add/manual', authMiddleware, TimerController.addManualEntry)
route.get('/timer/delete/one/:id', TimerController.deleteOneEntry)

//Leads
route.get('/leads/get/all', LeadController.getAllLeads)
route.post('/leads/add/edit', LeadController.addUpdateLead)
route.get('/leads/delete/:id', LeadController.deleteOneLead)
route.post('/leads/won/lost/:id', LeadController.WonLost)
route.get('/leads/copy/one/:id', LeadController.CopyOneLead)

//Roles
route.get('/roles/predata/get', RolesController.getRolesPreData)
route.post('/roles/add', RolesController.addNewRole)
route.get('/roles/delete/one/:id', RolesController.deleteOneRole)
route.post('/roles/permissoins/save', RolesController.addPermissions)
route.get('/roles/users/get', RolesController.getUserRoles)
route.post('/roles/users/assign/role', RolesController.assignRoleToUser)

//Tasks
route.post('/tasks/add/project/name', TasksController.addProjectName)
route.post('/tasks/edit/project/name/:id', TasksController.editProjectName)
route.get('/tasks/delete/project/name/:id', TasksController.deleteProjectName)
route.get('/tasks/all/get', authMiddleware, TasksController.getAllProjects)
route.post('/tasks/add/project', TasksController.AddOneProject)
route.post('/tasks/add/maintask/:id', TasksController.addMainTaskOfProject)
route.post('/tasks/add/subtask/:id', TasksController.addSubTaskofMainTask)
route.post('/tasks/subtask/change/iscompleted/:id', TasksController.updateSubTaskofMainTask)
route.post('/tasks/subtask/delete/one/:id', TasksController.deleteSubTaskofMainTask)
route.post('/tasks/maintask/delete/one/:id', TasksController.deleteMainTaskOfProject)
route.get('/tasks/project/delete/one/:id', TasksController.deleteOneProject)
route.post('/tasks/project/edit/one/:id', authMiddleware, TasksController.EditOneProject)
route.get('/tasks/project/copy/one/:id', TasksController.CopyOneProject)

//Quick Notes
route.get('/quick/task/get/all', authMiddleware, QuickNotesController.GetAllQuickNotes)
route.post('/quick/task/add/one', authMiddleware, QuickNotesController.AddOneQuickNote)
route.get('/quick/task/complete/one/:id', authMiddleware, QuickNotesController.CheckOneQuickNote)

//Recurring Tasks
route.get('/recurring/task/get/all', authMiddleware, GetAllRecurringTasks)
route.post('/recurring/task/add/one/category', authMiddleware, AddOneRecurringTasksCategory)
route.post('/recurring/task/add/one/task', authMiddleware, AddOneRecurringTasks)
route.get('/recurring/task/complete/one/:id', authMiddleware, CheckOneRecurringTasks)
route.get('/recurring/task/delete/one/:id', authMiddleware, DeleteOneRecurringTasks)
route.get('/recurring/task/delete/one/category/:id', authMiddleware, DeleteOneTaskCategory)

//Sales
route.get('/sales/get/all', SalesController.getAllSale)
route.post('/sales/add/one', SalesController.addSale)
route.post('/sales/edit/one/:id', SalesController.editSale)
route.get('/sales/delete/one/:id', SalesController.deleteSale)
route.post('/sales/edit/one/note/:id', SalesController.editOneSaleNote)
route.get('/sales/edit/one/mark/paid/:id', SalesController.editOneSaleAsPaid)

//Chart Of Accounts
route.get('/chart_of_account/get/all', getAllChartOfAccounts)
route.post('/chart_of_account/add/one', addOneChartOfAccounts)

//HR Attendance
route.get('/hr/attendance/get/all', getAttendanceSheet)


//Construction
route.post('/construction/add/houseno', ConstructionController.addHouseNo)
route.get('/construction/delete/houseno/:id', ConstructionController.deleteHouseNo)
route.get('/construction/all/get', ConstructionController.getAllConstruction)
route.post('/construction/add/one', ConstructionController.AddOneConstruction)
route.get('/construction/task/delete/one/:id', ConstructionController.deleteOneConstruction)
route.post('/construction/task/edit/one/:id', ConstructionController.EditOneConstruction)
route.get('/construction/task/copy/one/:id', ConstructionController.CopyOneConstruction)
route.get('/construction/task/set/completed/one/:id', ConstructionController.SetCompletedOneConstruction)

//Templates
route.post('/template/category/add/one', TemplateController.addTemplateCategory)
route.get('/template/category/delete/one/:id', TemplateController.deleteTemplateCategory)
route.get('/template/get/all', authMiddleware, TemplateController.getAllTemplates)
route.post('/template/add/one', TemplateController.addOneTemplates)
route.post('/template/edit/one/:id', TemplateController.EditOneTemplate)
route.get('/template/delete/one/:id', TemplateController.DeleteOneTemplate)
route.get('/template/copy/one/:id', TemplateController.CopyOneTemplate)
route.post('/template/users/list/add/:id', TemplateController.addUsersToList)

//Goals
route.post('/goals/add/one', GoalsController.addGoal)
route.get('/goals/get/all', authMiddleware, GoalsController.getAllGoal)
route.post('/goals/edit/one/:id', GoalsController.editGoal)
route.get('/goals/delete/one/:id', GoalsController.DeleteGoal)

// Tickets
route.get('/tickets/email/get/all', authMiddleware, TicketsController.getEmails)
route.get('/tickets/email/markasread/:id/:cn', TicketsController.markAsRead)
route.post('/tickets/create/new', authMiddleware, TicketsController.createNewTicket)
route.post('/tickets/create/new/attachments', authMiddleware, upload.array('files'), TicketsController.createNewTicketWithAttachments)
route.post('/tickets/thread/reply', authMiddleware, TicketsController.replyToTicket)
route.post('/tickets/thread/reply/attachments', authMiddleware, upload.array('files'), TicketsController.replyToTicketWithAttachment)
route.get('/tickets/thread/complete/:id', TicketsController.markAsCompleted)
route.get('/tickets/thread/delete/:id', TicketsController.DeleteTicket)
route.get('/tickets/thread/attachment/download/:id/:mid/:cn', TicketsController.DownloadAttachment)
route.post('/tickets/edit/one/:id',authMiddleware, TicketsController.EditOneTicket)

//Notificaions
route.get('/notifications/get/all', authMiddleware, GetAllNotifications)
route.get('/notifications/mark/all/read', authMiddleware, MarkAllAsRead)
route.get('/notifications/mark/one/read/:id', MarkOneAsRead)

//Companies
route.get('/companies/get/all', getAllCompanies)
route.post('/companies/add/one', addCompany)
route.post('/companies/edit/one/:id', editCompany)
route.post('/companies/delete/one/:id', deleteCompany)

//Proposals
route.get('/proposals/get/all', authMiddleware, getAllProposals)
route.post('/proposals/add/one', addProposals)
route.post('/proposals/edit/one/:id', editProposals)
route.get('/proposals/delete/one/:id', deleteProposals)
route.get('/proposals/copy/one/:id', copyProposals)

//User Recurring Tasks
route.get('/user/recurring/tasks/get/all', authMiddleware, getAllUserRecurringTasks)
route.post('/user/recurring/tasks/add/one', addOneUserRecurringTasks)
route.post('/user/recurring/tasks/edit/one/:id', editOneUserRecurringTasks)
route.get('/user/recurring/tasks/delete/one/:id', deleteOneUserRecurringTasks)
route.get('/user/recurring/tasks/copy/one/:id', copyOneUserRecurringTasks)
route.post('/user/recurring/tasks/mark_complete/one/:id', markCompleteOneUserRecurringTasks)

//Search
route.get('/user/search/all', getAllValues)

//My List
route.get('/mylist/get/predata', GetMyListPreData)

//User List 
route.post('/userlist/data/save', authMiddleware, addEditUserList)


//AddPagesForRole
route.get('/roles/page/add/:name', addPageForRole)


module.exports = route