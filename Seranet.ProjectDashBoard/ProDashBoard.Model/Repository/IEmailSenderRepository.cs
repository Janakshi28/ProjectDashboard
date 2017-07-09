using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProDashBoard.Model.Repository
{
    public interface IEmailSenderRepository
    {
        bool sendTeamSatisfactionSurveyEmails(SurveyEmail surveyEmailData);
        bool SendEmail(string recipient, string subject, string body);
    }
}
