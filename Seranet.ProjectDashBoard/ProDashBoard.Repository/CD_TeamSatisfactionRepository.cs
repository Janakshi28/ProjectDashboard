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

namespace ProDashBoard.Repository
{
    public class CD_TeamSatisfactionRepository : ICD_TeamSatisfactionRepository
    {
        private readonly IDbConnection _db;
        private AuthorizationRepository authRepo;
                
        public CD_TeamSatisfactionRepository()
        {
            _db = new SqlConnection(ConfigurationManager.ConnectionStrings["DashBoard1"].ConnectionString);
            authRepo = new AuthorizationRepository();
        }
    }


}