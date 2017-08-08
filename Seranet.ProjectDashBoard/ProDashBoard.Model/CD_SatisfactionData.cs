using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProDashBoard.Model
{
    public class CD_SatisfactionData
    {
        public int Year { get; set; }
        public String Quarter { get; set; }
        public String Rating { get; set; }
        public string Completion { get; set; }
        public bool Trend { get; set; }
        public bool isEqual { get; set; }
    }
}