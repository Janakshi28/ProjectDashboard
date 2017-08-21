using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ProDashBoard.Model;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using Dapper;
using System.Diagnostics;
using ProDashBoard.Model.Repository;

namespace ProDashBoard.Data
{
    public class CD_NPSRepository : ICD_NPSRepository
    {
        private readonly IDbConnection _db;
        private AppSettingsRepository appRepo;

        public CD_NPSRepository()
        {
            _db = new SqlConnection(ConfigurationManager.ConnectionStrings["DashBoard1"].ConnectionString);
            appRepo = new AppSettingsRepository();
        }
        public List<CD_SatisfactionData> Get()
        {
            List<CD_SatisfactionData> resultsArray = this._db.Query("select top 7 Year,Quarter,NPS,Completion FROM CD_NetPromoterScore order by Year desc, Quarter desc").Select(d => new CD_SatisfactionData { Year = d.Year, Quarter = d.Quarter, Rating = d.NPS, Completion = d.Completion }).ToList();

            return resultsArray;
        }

        public List<CD_ProjectSatisfactionData> GetProjects(int Year, int Quarter)
        {
            int QuestionNO = appRepo.getNPSQuestionNo();
            List<CD_ProjectSatisfactionData> resultsArray = this._db.Query("SELECT  pj.Name, sumr.Answer FROM CustomerSatisfactionResults sumr join Project pj on sumr.ProjectId = pj.Id where sumr.Year =" + Year + " and sumr.Quarter =" + Quarter + " and sumr.QuestionOrder="+QuestionNO + "order by ABS(sumr.Answer) desc; ").Select(d => new CD_ProjectSatisfactionData { Name = d.Name, Answer = d.Answer }).ToList();

            return resultsArray;
        }
    }
}