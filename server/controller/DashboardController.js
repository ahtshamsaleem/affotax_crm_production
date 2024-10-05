const Clientdb = require("../model/Client/client");
const ConstructionDb = require("../model/Construction/Construction");
const HosueNoDb = require("../model/Construction/HouseNoForList");
const Jobsdb = require("../model/Jobs/jobs");
const SaleItemdb = require("../model/Sales/SaleItem");

exports.getDashboardData = async (req, res) => {
  try {
    var currentYear = null;
    var previousYear = null;
    var selectedDate = req.body.selectedDate;
    if (selectedDate) {
      const aaa = new Date(selectedDate);
      currentYear = aaa.getFullYear() + 1;
      previousYear = currentYear - 1;
    } else {
      currentYear = new Date().getFullYear();
      previousYear = currentYear - 1;
    }

    // Clients Count Start

    const clientsCountJan = await Clientdb.countDocuments({
      book_start_date: {
        $gte: `${currentYear}-01-01`,
        $lte: `${currentYear}-01-31`,
      },
    });
    const clientsCountFeb = await Clientdb.countDocuments({
      book_start_date: {
        $gte: `${currentYear}-02-01`,
        $lte: `${currentYear}-02-28`,
      },
    });
    const clientsCountMarch = await Clientdb.countDocuments({
      book_start_date: {
        $gte: `${currentYear}-03-01`,
        $lte: `${currentYear}-03-31`,
      },
    });
    const clientsCountApr = await Clientdb.countDocuments({
      book_start_date: {
        $gte: `${currentYear}-04-01`,
        $lte: `${currentYear}-04-30`,
      },
    });
    const clientsCountMay = await Clientdb.countDocuments({
      book_start_date: {
        $gte: `${currentYear}-05-01`,
        $lte: `${currentYear}-05-31`,
      },
    });
    const clientsCountJune = await Clientdb.countDocuments({
      book_start_date: {
        $gte: `${currentYear}-06-01`,
        $lte: `${currentYear}-06-30`,
      },
    });
    const clientsCountJuly = await Clientdb.countDocuments({
      book_start_date: {
        $gte: `${currentYear}-07-01`,
        $lte: `${currentYear}-07-31`,
      },
    });
    const clientsCountAugust = await Clientdb.countDocuments({
      book_start_date: {
        $gte: `${currentYear}-08-01`,
        $lte: `${currentYear}-08-31`,
      },
    });
    const clientsCountSept = await Clientdb.countDocuments({
      book_start_date: {
        $gte: `${currentYear}-09-01`,
        $lte: `${currentYear}-09-30`,
      },
    });
    const clientsCountOct = await Clientdb.countDocuments({
      book_start_date: {
        $gte: `${currentYear}-10-01`,
        $lte: `${currentYear}-10-31`,
      },
    });
    const clientsCountNov = await Clientdb.countDocuments({
      book_start_date: {
        $gte: `${currentYear}-11-01`,
        $lte: `${currentYear}-11-30`,
      },
    });
    const clientsCountDec = await Clientdb.countDocuments({
      book_start_date: {
        $gte: `${currentYear}-12-01`,
        $lte: `${currentYear}-12-31`,
      },
    });

    const clientsCountJanP = await Clientdb.countDocuments({
      book_start_date: {
        $gte: `${previousYear}-01-01`,
        $lte: `${previousYear}-01-31`,
      },
    });
    const clientsCountFebP = await Clientdb.countDocuments({
      book_start_date: {
        $gte: `${previousYear}-02-01`,
        $lte: `${previousYear}-02-28`,
      },
    });
    const clientsCountMarchP = await Clientdb.countDocuments({
      book_start_date: {
        $gte: `${previousYear}-03-01`,
        $lte: `${previousYear}-03-31`,
      },
    });
    const clientsCountAprP = await Clientdb.countDocuments({
      book_start_date: {
        $gte: `${previousYear}-04-01`,
        $lte: `${previousYear}-04-30`,
      },
    });
    const clientsCountMayP = await Clientdb.countDocuments({
      book_start_date: {
        $gte: `${previousYear}-05-01`,
        $lte: `${previousYear}-05-31`,
      },
    });
    const clientsCountJuneP = await Clientdb.countDocuments({
      book_start_date: {
        $gte: `${previousYear}-06-01`,
        $lte: `${previousYear}-06-30`,
      },
    });
    const clientsCountJulyP = await Clientdb.countDocuments({
      book_start_date: {
        $gte: `${previousYear}-07-01`,
        $lte: `${previousYear}-07-31`,
      },
    });
    const clientsCountAugustP = await Clientdb.countDocuments({
      book_start_date: {
        $gte: `${previousYear}-08-01`,
        $lte: `${previousYear}-08-31`,
      },
    });
    const clientsCountSeptP = await Clientdb.countDocuments({
      book_start_date: {
        $gte: `${previousYear}-09-01`,
        $lte: `${previousYear}-09-30`,
      },
    });
    const clientsCountOctP = await Clientdb.countDocuments({
      book_start_date: {
        $gte: `${previousYear}-10-01`,
        $lte: `${previousYear}-10-31`,
      },
    });
    const clientsCountNovP = await Clientdb.countDocuments({
      book_start_date: {
        $gte: `${previousYear}-11-01`,
        $lte: `${previousYear}-11-30`,
      },
    });
    const clientsCountDecP = await Clientdb.countDocuments({
      book_start_date: {
        $gte: `${previousYear}-12-01`,
        $lte: `${previousYear}-12-31`,
      },
    });

    const clientsCount = {
      selectedYear: currentYear,
      PreviousYear: previousYear,

      jan: clientsCountJan,
      feb: clientsCountFeb,
      march: clientsCountMarch,
      apr: clientsCountApr,
      may: clientsCountMay,
      june: clientsCountJune,
      july: clientsCountJuly,
      aug: clientsCountAugust,
      sept: clientsCountSept,
      oct: clientsCountOct,
      nov: clientsCountNov,
      dec: clientsCountDec,

      janP: clientsCountJanP,
      febP: clientsCountFebP,
      marchP: clientsCountMarchP,
      aprP: clientsCountAprP,
      mayP: clientsCountMayP,
      juneP: clientsCountJuneP,
      julyP: clientsCountJulyP,
      augP: clientsCountAugustP,
      septP: clientsCountSeptP,
      octP: clientsCountOctP,
      novP: clientsCountNovP,
      decP: clientsCountDecP,
    };

    // Clients Count End

    // Department Fee Start
    const DepartmentFeeCountBookKeeping = await Jobsdb.aggregate([
      {
        $match: { job_name: "Bookkeeping" },
      },
      {
        $match: { fee: { $regex: /\S/ } }, // filter out documents with empty or whitespace-only fees
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$fee", "0"] } } },
        },
      },
    ]);

    const DepartmentFeeCountPayroll = await Jobsdb.aggregate([
      {
        $match: { job_name: "Payroll" },
      },
      {
        $match: { fee: { $regex: /\S/ } }, // filter out documents with empty or whitespace-only fees
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$fee", "0"] } } },
        },
      },
    ]);

    const DepartmentFeeCountVatReturn = await Jobsdb.aggregate([
      {
        $match: { job_name: "Vat Return" },
      },
      {
        $match: { fee: { $regex: /\S/ } }, // filter out documents with empty or whitespace-only fees
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$fee", "0"] } } },
        },
      },
    ]);

    const DepartmentFeeCountAccounts = await Jobsdb.aggregate([
      {
        $match: { job_name: "Accounts" },
      },
      {
        $match: { fee: { $regex: /\S/ } }, // filter out documents with empty or whitespace-only fees
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$fee", "0"] } } },
        },
      },
    ]);

    const DepartmentFeeCountPersonalTax = await Jobsdb.aggregate([
      {
        $match: { job_name: "Personal Tax" },
      },
      {
        $match: { fee: { $regex: /\S/ } }, // filter out documents with empty or whitespace-only fees
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$fee", "0"] } } },
        },
      },
    ]);

    const DepartmentFeeCountCompanySec = await Jobsdb.aggregate([
      {
        $match: { job_name: "Company Sec" },
      },
      {
        $match: { fee: { $regex: /\S/ } }, // filter out documents with empty or whitespace-only fees
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$fee", "0"] } } },
        },
      },
    ]);

    const DepartmentFeeCountAddress = await Jobsdb.aggregate([
      {
        $match: { job_name: "Address" },
      },
      {
        $match: { fee: { $regex: /\S/ } }, // filter out documents with empty or whitespace-only fees
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$fee", "0"] } } },
        },
      },
    ]);

    const DepartmentFeeCountBilling = await Jobsdb.aggregate([
      {
        $match: { job_name: "Billing" },
      },
      {
        $match: { fee: { $regex: /\S/ } }, // filter out documents with empty or whitespace-only fees
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$fee", "0"] } } },
        },
      },
    ]);

    const DepartmentFee = {
      bookKeeping: DepartmentFeeCountBookKeeping[0]?.totalFee || 0,
      payRoll: DepartmentFeeCountPayroll[0]?.totalFee || 0,
      vatReturn: DepartmentFeeCountVatReturn[0]?.totalFee || 0,
      accounts: DepartmentFeeCountAccounts[0]?.totalFee || 0,
      personalTax: DepartmentFeeCountPersonalTax[0]?.totalFee || 0,
      companySec: DepartmentFeeCountCompanySec[0]?.totalFee || 0,
      address: DepartmentFeeCountAddress[0]?.totalFee || 0,
      billing: DepartmentFeeCountBilling[0]?.totalFee || 0,
    };
    // Department Fee End

    // Client Fee Start
    const ClientFeeCountJan = await Clientdb.aggregate([
      {
        $match: {
          book_start_date: {
            $gte: `${currentYear}-01-01`,
            $lte: `${currentYear}-01-31`,
          },
        },
      },
      {
        $match: { hourly_rate: { $regex: /\S/ } }, // filter out documents with empty or whitespace-only fees
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$hourly_rate", "0"] } } },
        },
      },
    ]);

    const ClientFeeCountFeb = await Clientdb.aggregate([
      {
        $match: {
          book_start_date: {
            $gte: `${currentYear}-02-28`,
            $lte: `${currentYear}-02-28`,
          },
        },
      },
      {
        $match: { hourly_rate: { $regex: /\S/ } }, // filter out documents with empty or whitespace-only fees
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$hourly_rate", "0"] } } },
        },
      },
    ]);

    const ClientFeeCountMar = await Clientdb.aggregate([
      {
        $match: {
          book_start_date: {
            $gte: `${currentYear}-03-01`,
            $lte: `${currentYear}-03-31`,
          },
        },
      },
      {
        $match: { hourly_rate: { $regex: /\S/ } }, // filter out documents with empty or whitespace-only fees
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$hourly_rate", "0"] } } },
        },
      },
    ]);

    const ClientFeeCountApr = await Clientdb.aggregate([
      {
        $match: {
          book_start_date: {
            $gte: `${currentYear}-04-01`,
            $lte: `${currentYear}-04-30`,
          },
        },
      },
      {
        $match: { hourly_rate: { $regex: /\S/ } }, // filter out documents with empty or whitespace-only fees
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$hourly_rate", "0"] } } },
        },
      },
    ]);

    const ClientFeeCountMay = await Clientdb.aggregate([
      {
        $match: {
          book_start_date: {
            $gte: `${currentYear}-05-01`,
            $lte: `${currentYear}-05-31`,
          },
        },
      },
      {
        $match: { hourly_rate: { $regex: /\S/ } }, // filter out documents with empty or whitespace-only fees
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$hourly_rate", "0"] } } },
        },
      },
    ]);

    const ClientFeeCountJune = await Clientdb.aggregate([
      {
        $match: {
          book_start_date: {
            $gte: `${currentYear}-06-01`,
            $lte: `${currentYear}-06-30`,
          },
        },
      },
      {
        $match: { hourly_rate: { $regex: /\S/ } }, // filter out documents with empty or whitespace-only fees
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$hourly_rate", "0"] } } },
        },
      },
    ]);

    const ClientFeeCountJuly = await Clientdb.aggregate([
      {
        $match: {
          book_start_date: {
            $gte: `${currentYear}-07-01`,
            $lte: `${currentYear}-07-31`,
          },
        },
      },
      {
        $match: { hourly_rate: { $regex: /\S/ } }, // filter out documents with empty or whitespace-only fees
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$hourly_rate", "0"] } } },
        },
      },
    ]);

    const ClientFeeCountAug = await Clientdb.aggregate([
      {
        $match: {
          book_start_date: {
            $gte: `${currentYear}-08-01`,
            $lte: `${currentYear}-08-31`,
          },
        },
      },
      {
        $match: { hourly_rate: { $regex: /\S/ } }, // filter out documents with empty or whitespace-only fees
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$hourly_rate", "0"] } } },
        },
      },
    ]);

    const ClientFeeCountSept = await Clientdb.aggregate([
      {
        $match: {
          book_start_date: {
            $gte: `${currentYear}-09-01`,
            $lte: `${currentYear}-09-30`,
          },
        },
      },
      {
        $match: { hourly_rate: { $regex: /\S/ } }, // filter out documents with empty or whitespace-only fees
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$hourly_rate", "0"] } } },
        },
      },
    ]);

    const ClientFeeCountOct = await Clientdb.aggregate([
      {
        $match: {
          book_start_date: {
            $gte: `${currentYear}-10-01`,
            $lte: `${currentYear}-10-31`,
          },
        },
      },
      {
        $match: { hourly_rate: { $regex: /\S/ } }, // filter out documents with empty or whitespace-only fees
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$hourly_rate", "0"] } } },
        },
      },
    ]);

    const ClientFeeCountNov = await Clientdb.aggregate([
      {
        $match: {
          book_start_date: {
            $gte: `${currentYear}-11-01`,
            $lte: `${currentYear}-11-30`,
          },
        },
      },
      {
        $match: { hourly_rate: { $regex: /\S/ } }, // filter out documents with empty or whitespace-only fees
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$hourly_rate", "0"] } } },
        },
      },
    ]);

    const ClientFeeCountDec = await Clientdb.aggregate([
      {
        $match: {
          book_start_date: {
            $gte: `${currentYear}-12-01`,
            $lte: `${currentYear}-12-31`,
          },
        },
      },
      {
        $match: { hourly_rate: { $regex: /\S/ } }, // filter out documents with empty or whitespace-only fees
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$hourly_rate", "0"] } } },
        },
      },
    ]);

    const ClientFeeCountJanP = await Clientdb.aggregate([
      {
        $match: {
          book_start_date: {
            $gte: `${previousYear}-01-01`,
            $lte: `${previousYear}-01-31`,
          },
        },
      },
      {
        $match: { hourly_rate: { $regex: /\S/ } }, // filter out documents with empty or whitespace-only fees
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$hourly_rate", "0"] } } },
        },
      },
    ]);

    const ClientFeeCountFebP = await Clientdb.aggregate([
      {
        $match: {
          book_start_date: {
            $gte: `${previousYear}-02-28`,
            $lte: `${previousYear}-02-28`,
          },
        },
      },
      {
        $match: { hourly_rate: { $regex: /\S/ } }, // filter out documents with empty or whitespace-only fees
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$hourly_rate", "0"] } } },
        },
      },
    ]);

    const ClientFeeCountMarP = await Clientdb.aggregate([
      {
        $match: {
          book_start_date: {
            $gte: `${previousYear}-03-01`,
            $lte: `${previousYear}-03-31`,
          },
        },
      },
      {
        $match: { hourly_rate: { $regex: /\S/ } }, // filter out documents with empty or whitespace-only fees
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$hourly_rate", "0"] } } },
        },
      },
    ]);

    const ClientFeeCountAprP = await Clientdb.aggregate([
      {
        $match: {
          book_start_date: {
            $gte: `${previousYear}-04-01`,
            $lte: `${previousYear}-04-30`,
          },
        },
      },
      {
        $match: { hourly_rate: { $regex: /\S/ } }, // filter out documents with empty or whitespace-only fees
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$hourly_rate", "0"] } } },
        },
      },
    ]);

    const ClientFeeCountMayP = await Clientdb.aggregate([
      {
        $match: {
          book_start_date: {
            $gte: `${previousYear}-05-01`,
            $lte: `${previousYear}-05-31`,
          },
        },
      },
      {
        $match: { hourly_rate: { $regex: /\S/ } }, // filter out documents with empty or whitespace-only fees
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$hourly_rate", "0"] } } },
        },
      },
    ]);

    const ClientFeeCountJuneP = await Clientdb.aggregate([
      {
        $match: {
          book_start_date: {
            $gte: `${previousYear}-06-01`,
            $lte: `${previousYear}-06-30`,
          },
        },
      },
      {
        $match: { hourly_rate: { $regex: /\S/ } }, // filter out documents with empty or whitespace-only fees
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$hourly_rate", "0"] } } },
        },
      },
    ]);

    const ClientFeeCountJulyP = await Clientdb.aggregate([
      {
        $match: {
          book_start_date: {
            $gte: `${previousYear}-07-01`,
            $lte: `${previousYear}-07-31`,
          },
        },
      },
      {
        $match: { hourly_rate: { $regex: /\S/ } }, // filter out documents with empty or whitespace-only fees
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$hourly_rate", "0"] } } },
        },
      },
    ]);

    const ClientFeeCountAugP = await Clientdb.aggregate([
      {
        $match: {
          book_start_date: {
            $gte: `${previousYear}-08-01`,
            $lte: `${previousYear}-08-31`,
          },
        },
      },
      {
        $match: { hourly_rate: { $regex: /\S/ } }, // filter out documents with empty or whitespace-only fees
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$hourly_rate", "0"] } } },
        },
      },
    ]);

    const ClientFeeCountSeptP = await Clientdb.aggregate([
      {
        $match: {
          book_start_date: {
            $gte: `${previousYear}-09-01`,
            $lte: `${previousYear}-09-30`,
          },
        },
      },
      {
        $match: { hourly_rate: { $regex: /\S/ } }, // filter out documents with empty or whitespace-only fees
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$hourly_rate", "0"] } } },
        },
      },
    ]);

    const ClientFeeCountOctP = await Clientdb.aggregate([
      {
        $match: {
          book_start_date: {
            $gte: `${previousYear}-10-01`,
            $lte: `${previousYear}-10-31`,
          },
        },
      },
      {
        $match: { hourly_rate: { $regex: /\S/ } }, // filter out documents with empty or whitespace-only fees
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$hourly_rate", "0"] } } },
        },
      },
    ]);

    const ClientFeeCountNovP = await Clientdb.aggregate([
      {
        $match: {
          book_start_date: {
            $gte: `${previousYear}-11-01`,
            $lte: `${previousYear}-11-30`,
          },
        },
      },
      {
        $match: { hourly_rate: { $regex: /\S/ } }, // filter out documents with empty or whitespace-only fees
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$hourly_rate", "0"] } } },
        },
      },
    ]);

    const ClientFeeCountDecP = await Clientdb.aggregate([
      {
        $match: {
          book_start_date: {
            $gte: `${previousYear}-12-01`,
            $lte: `${previousYear}-12-31`,
          },
        },
      },
      {
        $match: { hourly_rate: { $regex: /\S/ } }, // filter out documents with empty or whitespace-only fees
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$hourly_rate", "0"] } } },
        },
      },
    ]);

    const ClientFee = {
      selectedYear: currentYear,
      PreviousYear: previousYear,

      jan: ClientFeeCountJan[0]?.totalFee || 0,
      feb: ClientFeeCountFeb[0]?.totalFee || 0,
      march: ClientFeeCountMar[0]?.totalFee || 0,
      apr: ClientFeeCountApr[0]?.totalFee || 0,
      may: ClientFeeCountMay[0]?.totalFee || 0,
      june: ClientFeeCountJune[0]?.totalFee || 0,
      july: ClientFeeCountJuly[0]?.totalFee || 0,
      aug: ClientFeeCountAug[0]?.totalFee || 0,
      sept: ClientFeeCountSept[0]?.totalFee || 0,
      oct: ClientFeeCountOct[0]?.totalFee || 0,
      nov: ClientFeeCountNov[0]?.totalFee || 0,
      dec: ClientFeeCountDec[0]?.totalFee || 0,

      janP: ClientFeeCountJanP[0]?.totalFee || 0,
      febP: ClientFeeCountFebP[0]?.totalFee || 0,
      marchP: ClientFeeCountMarP[0]?.totalFee || 0,
      aprP: ClientFeeCountAprP[0]?.totalFee || 0,
      mayP: ClientFeeCountMayP[0]?.totalFee || 0,
      juneP: ClientFeeCountJuneP[0]?.totalFee || 0,
      julyP: ClientFeeCountJulyP[0]?.totalFee || 0,
      augP: ClientFeeCountAugP[0]?.totalFee || 0,
      septP: ClientFeeCountSeptP[0]?.totalFee || 0,
      octP: ClientFeeCountOctP[0]?.totalFee || 0,
      novP: ClientFeeCountNovP[0]?.totalFee || 0,
      decP: ClientFeeCountDecP[0]?.totalFee || 0,
    };
    // Client Fee End

    // Department OverDue Start

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const AllDepartments = await Jobsdb.find();
    const DepartmentOverdueBookKeeping = AllDepartments.filter(
      (item) =>
        item.job_name === "Bookkeeping" &&
        ((item.job_deadline && new Date(item.job_deadline) < today) ||
          (item.job_deadline &&
            new Date(item.job_deadline) < today &&
            item.year_end &&
            new Date(item.year_end) < today))
    );
    const DepartmentOverduePayroll = AllDepartments.filter(
      (item) =>
        item.job_name === "Payroll" &&
        ((item.job_deadline && new Date(item.job_deadline) < today) ||
          (item.job_deadline &&
            new Date(item.job_deadline) < today &&
            item.year_end &&
            new Date(item.year_end) < today))
    );
    const DepartmentOverdueVatReturn = AllDepartments.filter(
      (item) =>
        item.job_name === "Vat Return" &&
        ((item.job_deadline && new Date(item.job_deadline) < today) ||
          (item.job_deadline &&
            new Date(item.job_deadline) < today &&
            item.year_end &&
            new Date(item.year_end) < today))
    );
    const DepartmentOverdueAccounts = AllDepartments.filter(
      (item) =>
        item.job_name === "Accounts" &&
        ((item.job_deadline && new Date(item.job_deadline) < today) ||
          (item.job_deadline &&
            new Date(item.job_deadline) < today &&
            item.year_end &&
            new Date(item.year_end) < today))
    );
    const DepartmentOverduePersonalTax = AllDepartments.filter(
      (item) =>
        item.job_name === "Personal Tax" &&
        ((item.job_deadline && new Date(item.job_deadline) < today) ||
          (item.job_deadline &&
            new Date(item.job_deadline) < today &&
            item.year_end &&
            new Date(item.year_end) < today))
    );
    const DepartmentOverdueCompanySec = AllDepartments.filter(
      (item) =>
        item.job_name === "Company Sec" &&
        ((item.job_deadline && new Date(item.job_deadline) < today) ||
          (item.job_deadline &&
            new Date(item.job_deadline) < today &&
            item.year_end &&
            new Date(item.year_end) < today))
    );
    const DepartmentOverdueAddress = AllDepartments.filter(
      (item) =>
        item.job_name === "Address" &&
        ((item.job_deadline && new Date(item.job_deadline) < today) ||
          (item.job_deadline &&
            new Date(item.job_deadline) < today &&
            item.year_end &&
            new Date(item.year_end) < today))
    );
    const DepartmentOverdueBilling = AllDepartments.filter(
      (item) =>
        item.job_name === "Billing" &&
        ((item.job_deadline && new Date(item.job_deadline) < today) ||
          (item.job_deadline &&
            new Date(item.job_deadline) < today &&
            item.year_end &&
            new Date(item.year_end) < today))
    );

    const JobsOverdue = {
      bookKeeping: DepartmentOverdueBookKeeping,
      payRoll: DepartmentOverduePayroll,
      vatReturn: DepartmentOverdueVatReturn,
      accounts: DepartmentOverdueAccounts,
      personalTax: DepartmentOverduePersonalTax,
      companySec: DepartmentOverdueCompanySec,
      address: DepartmentOverdueAddress,
      billing: DepartmentOverdueBilling,
    };

    // Department OverDue End

    // Department Due Start

    const DepartmentdueBookKeeping = AllDepartments.filter(
      (item) =>
        item.job_name === "Bookkeeping" &&
        ((item.job_deadline && new Date(item.job_deadline) === today) ||
          (!(item.job_deadline && new Date(item.job_deadline) <= today) &&
            item.year_end &&
            new Date(item.year_end) <= today))
    );
    const DepartmentduePayroll = AllDepartments.filter(
      (item) =>
        item.job_name === "Payroll" &&
        ((item.job_deadline && new Date(item.job_deadline) === today) ||
          (!(item.job_deadline && new Date(item.job_deadline) <= today) &&
            item.year_end &&
            new Date(item.year_end) <= today))
    );
    const DepartmentdueVatReturn = AllDepartments.filter(
      (item) =>
        item.job_name === "Vat Return" &&
        ((item.job_deadline && new Date(item.job_deadline) === today) ||
          (!(item.job_deadline && new Date(item.job_deadline) <= today) &&
            item.year_end &&
            new Date(item.year_end) <= today))
    );
    const DepartmentdueAccounts = AllDepartments.filter(
      (item) =>
        item.job_name === "Accounts" &&
        ((item.job_deadline && new Date(item.job_deadline) === today) ||
          (!(item.job_deadline && new Date(item.job_deadline) <= today) &&
            item.year_end &&
            new Date(item.year_end) <= today))
    );
    const DepartmentduePersonalTax = AllDepartments.filter(
      (item) =>
        item.job_name === "Personal Tax" &&
        ((item.job_deadline && new Date(item.job_deadline) === today) ||
          (!(item.job_deadline && new Date(item.job_deadline) <= today) &&
            item.year_end &&
            new Date(item.year_end) <= today))
    );
    const DepartmentdueCompanySec = AllDepartments.filter(
      (item) =>
        item.job_name === "Company Sec" &&
        ((item.job_deadline && new Date(item.job_deadline) === today) ||
          (!(item.job_deadline && new Date(item.job_deadline) <= today) &&
            item.year_end &&
            new Date(item.year_end) <= today))
    );
    const DepartmentdueAddress = AllDepartments.filter(
      (item) =>
        item.job_name === "Address" &&
        ((item.job_deadline && new Date(item.job_deadline) === today) ||
          (!(item.job_deadline && new Date(item.job_deadline) <= today) &&
            item.year_end &&
            new Date(item.year_end) <= today))
    );
    const DepartmentdueBilling = AllDepartments.filter(
      (item) =>
        item.job_name === "Billing" &&
        ((item.job_deadline && new Date(item.job_deadline) === today) ||
          (!(item.job_deadline && new Date(item.job_deadline) <= today) &&
            item.year_end &&
            new Date(item.year_end) <= today))
    );

    const Jobsdue = {
      bookKeeping: DepartmentdueBookKeeping,
      payRoll: DepartmentduePayroll,
      vatReturn: DepartmentdueVatReturn,
      accounts: DepartmentdueAccounts,
      personalTax: DepartmentduePersonalTax,
      companySec: DepartmentdueCompanySec,
      address: DepartmentdueAddress,
      billing: DepartmentdueBilling,
    };

    // Department Due End

    //Subscription Fee Graph

    const SubscriptionFeeWeekly = await Jobsdb.aggregate([
      {
        $match: { job_name: "Billing" },
      },
      {
        $match: { subscription: "Weekly" },
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$fee", 0] } } },
        },
      },
    ]);

    const SubscriptionFeeMonthly = await Jobsdb.aggregate([
      {
        $match: { job_name: "Billing" },
      },
      {
        $match: { subscription: "Monthly" },
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$fee", 0] } } },
        },
      },
    ]);

    const SubscriptionFeeQuarterly = await Jobsdb.aggregate([
      {
        $match: { job_name: "Billing" },
      },
      {
        $match: { subscription: "Quarterly" },
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$fee", 0] } } },
        },
      },
    ]);

    const SubscriptionFeeAnually = await Jobsdb.aggregate([
      {
        $match: { job_name: "Billing" },
      },
      {
        $match: { subscription: "Yearly" },
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: { $toDouble: { $ifNull: ["$fee", 0] } } },
        },
      },
    ]);

    const SubscriptionGraph = {
      Weekly: SubscriptionFeeWeekly,
      Monthly: SubscriptionFeeMonthly,
      Quarterly: SubscriptionFeeQuarterly,
      Anually: SubscriptionFeeAnually,
    };

    // Partners and Sources Grpah Start

    const PartnersGraph = {};
    const SourcesGraph = {};
    await Clientdb.find().then(function (clients, err) {
      if (err) {
        console.error("Failed to fetch clients:", err);
        return;
      }

      // Assuming the partner type field is called 'partnerType'
      const partnerTypes = ["Outsource", "Affotax", "OTL"]; // Add more partner types if needed
      const sourceTypes = [
        "FIV",
        "UPW",
        "Referal",
        "Website",
        "PPH",
        "Partner",
      ]; // Add more partner types if needed

      const totalClients = clients.length;
      const partnerCounts = {};
      const sourceCounts = {};

      // Initialize partnerCounts object
      partnerTypes.forEach((partnerType) => {
        partnerCounts[partnerType] = 0;
      });

      // Initialize sourceCounts object
      sourceTypes.forEach((sourceType) => {
        sourceCounts[sourceType] = 0;
      });

      // Count the occurrences of each partner type
      clients.forEach((client) => {
        const partnerType = client.partner;
        if (partnerCounts.hasOwnProperty(partnerType)) {
          partnerCounts[partnerType]++;
        }

        const sourceType = client.source;
        if (sourceCounts.hasOwnProperty(sourceType)) {
          sourceCounts[sourceType]++;
        }
      });

      // Calculate the percentage for each partner type

      partnerTypes.forEach((partnerType) => {
        const count = partnerCounts[partnerType];
        const percentage = (count / totalClients) * 100;
        PartnersGraph[partnerType] = percentage; // Keep two decimal places
      });
      sourceTypes.forEach((sourceType) => {
        const count = sourceCounts[sourceType];
        const percentage = (count / totalClients) * 100;
        SourcesGraph[sourceType] = percentage; // Keep two decimal places
      });
    });

    // Partners and Sources Grpah End

    function calculateDaysBetweenDates(date1, date2) {
      // Convert the dates to UTC to avoid time zone issues
      const utcDate1 = new Date(date1.toUTCString());
      const utcDate2 = new Date(date2.toUTCString());

      // Calculate the time difference in milliseconds
      const timeDiff = Math.abs(utcDate2 - utcDate1);

      // Convert the time difference to days
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

      return days;
    }

    //Construction Graph Starts

    const ConstructionOpenProjectsFinalArray = [];
    const ConstructionCloseProjectsFinalArray = [];

    const constructionProjects = await HosueNoDb.find();
    const constructionProjectOpen = constructionProjects.filter(
      (data) => data.isActive
    );
    const constructionProjectClose = constructionProjects.filter(
      (data) => !data.isActive
    );

    for (const data of constructionProjectOpen) {
      const constructionOpenData = await ConstructionDb.find({
        houseNoList_id: data._id,
      });

      let ConstructionTotalDays = 0;
      let ConstructionTotalActualDays = 0;
      let ConstructionTotalBudget = 0;
      let ConstructionTotalActualBudget = 0;

      for (const data2 of constructionOpenData) {
        const startDate = new Date(data2.startDate);
        const EndDate = new Date(data2.completationDate);
        const EndActualDate = new Date(data2.completationDateActual);
        const budgetPlan = data2.budgetPlan;
        const budgetActual = data2.budgetActual;

        const days = calculateDaysBetweenDates(startDate, EndDate);
        const actualDays = calculateDaysBetweenDates(startDate, EndActualDate);

        ConstructionTotalDays += +days;
        ConstructionTotalActualDays += +actualDays;
        ConstructionTotalBudget += +budgetPlan;
        ConstructionTotalActualBudget += +budgetActual;
      }

      const objToPush = {
        projName: data.name,
        ConstructionTotalDays,
        ConstructionTotalActualDays,
        ConstructionTotalBudget,
        ConstructionTotalActualBudget,
      };

      ConstructionOpenProjectsFinalArray.push(objToPush);
    }

    for (const data of constructionProjectClose) {
      const constructionCloseData = await ConstructionDb.find({
        houseNoList_id: data._id,
      });

      let ConstructionTotalDays = 0;
      let ConstructionTotalActualDays = 0;
      let ConstructionTotalBudget = 0;
      let ConstructionTotalActualBudget = 0;

      for (const data2 of constructionCloseData) {
        const startDate = new Date(data2.startDate);
        const EndDate = new Date(data2.completationDate);
        const EndActualDate = new Date(data2.completationDateActual);
        const budgetPlan = data2.budgetPlan;
        const budgetActual = data2.budgetActual;

        const days = calculateDaysBetweenDates(startDate, EndDate);
        const actualDays = calculateDaysBetweenDates(startDate, EndActualDate);

        ConstructionTotalDays += +days;
        ConstructionTotalActualDays += +actualDays;
        ConstructionTotalBudget += +budgetPlan;
        ConstructionTotalActualBudget += +budgetActual;
      }

      const objToPush = {
        projName: data.name,
        ConstructionTotalDays,
        ConstructionTotalActualDays,
        ConstructionTotalBudget,
        ConstructionTotalActualBudget,
      };

      ConstructionCloseProjectsFinalArray.push(objToPush);
    }

    const ConstructionGraph = {
      ConstructionOpenProjectsFinalArray,
      ConstructionCloseProjectsFinalArray,
    };

    //Construction Graph Ends

    //Sales Graph Ends

    const Sales = await SaleItemdb.find();

    const SalesGraph = {};

    // Assuming the partner type field is called 'partnerType'
    const SalesTypes = [
      "Bookkeeping",
      "Payroll",
      "Vat Return",
      "Accounts",
      "Personal Tax",
      "Company Sec",
      "Address",
      "Consultancy",
      "Others",
    ]; // Add more partner types if needed

    const totalSales = Sales.length;
    const SalesCounts = {};

    // Initialize SaleCounts object
    SalesTypes.forEach((saleType) => {
      SalesCounts[saleType] = 0;
    });

    // Count the occurrences of each sale type
    Sales.forEach((sale) => {
      const saleType = sale.product;
      if (SalesCounts.hasOwnProperty(saleType)) {
        SalesCounts[saleType]++;
      }

      // Calculate the percentage for each partner type

      SalesTypes.forEach((saleType) => {
        const count = SalesCounts[saleType];
        const percentage = (count / totalSales) * 100;
        SalesGraph[saleType] = percentage; // Keep two decimal places
      });
    });

    //Sales Graph Ends

    const response = {
      clientsCount,
      DepartmentFee,
      ClientFee,
      JobsOverdue,
      Jobsdue,
      PartnersGraph,
      SourcesGraph,
      ConstructionGraph,
      SubscriptionGraph,
      SalesGraph,
    };
    res.json(response);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
