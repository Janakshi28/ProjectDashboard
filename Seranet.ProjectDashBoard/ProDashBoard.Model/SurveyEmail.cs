using ProDashBoard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProDashBoard.Model
{
    public class SurveyEmail
    {
        public Account Account { get; set; }
        public int Year { get; set; }
        public int Quarter { get; set; }
        public string DeadLine { get; set; }
        public List<int> ValidEmployees { get; set; }
    }
}
