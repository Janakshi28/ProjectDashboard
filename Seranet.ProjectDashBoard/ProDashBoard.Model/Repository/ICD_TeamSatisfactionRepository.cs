using ProDashBoard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ProDashBoard.Model.Repository
{
    interface ICD_TeamSatisfactionRepository
    {
        List<CD_TeamSatisfactionData> Get();
    }
}
