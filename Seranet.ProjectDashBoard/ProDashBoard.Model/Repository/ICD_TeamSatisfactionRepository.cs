using ProDashBoard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ProDashBoard.Model.Repository
{
    public interface ICD_TeamSatisfactionRepository
    {
        List<CD_SatisfactionData> Get();
        List<CD_ProjectSatisfactionData> GetProjects(int Year, int Quarter);

        int getCompletion(int Year, int Quarter);
    }
}
