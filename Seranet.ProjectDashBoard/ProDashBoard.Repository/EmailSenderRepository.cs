using Microsoft.Exchange.WebServices.Data;
using ProDashBoard.Data;
using ProDashBoard.Model;
using ProDashBoard.Model.Repository;
using ProDashBoard.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading;
using System.Web;
using System.Web.Configuration;

namespace ProDashBoard.Repository
{
    public class EmailSenderRepository : IEmailSenderRepository
    {

        private TeamMemberRepository teamMemberRepo;
        private AppSettingsRepository appSettingsRepo;
        ExchangeService service = null;
        public EmailSenderRepository()
        {
            teamMemberRepo = new TeamMemberRepository();
            appSettingsRepo = new AppSettingsRepository();
            initializeEmailService();
        }

        public void initializeEmailService() {
            service = new ExchangeService(ExchangeVersion.Exchange2007_SP1);
            string emailUsername = appSettingsRepo.getEmailUserName();
            string emailPassword = appSettingsRepo.getEmailPassword();
            string emailDomain = appSettingsRepo.getEmailDomain();
            string emailUri = appSettingsRepo.getEmailUri();
            service.Credentials = new WebCredentials(emailUsername, emailPassword,emailDomain);
            service.Url = new Uri(emailUri);
            service.TraceEnabled = true;
            
        }

        public bool sendTeamSatisfactionSurveyEmails(SurveyEmail surveyEmailData) {
            if (surveyEmailData != null)
            {
                string subject = " " + surveyEmailData.Account.AccountName + " Team satisfaction - " + surveyEmailData.Year + " : Q" + surveyEmailData.Quarter + " ";
                string body = "<html><body>"
                    + "<h4>Hi Team,</h4><br>"
                    + "<div>It is once again, that time of the quarter where you are tasked with filling out the team satisfaction survey for " + surveyEmailData.Year + " : Q" + surveyEmailData.Quarter + " . "
                    + "<br> Please be kind enough to complete this task before " + surveyEmailData.DeadLine + " .</ div>"
                    + "<br><br> You may find the form here: <a href="+appSettingsRepo.getEmailBodyLink()+"" + surveyEmailData.Account.Id + "/" + surveyEmailData.Year + "/" + surveyEmailData.Quarter + " >"+ appSettingsRepo.getEmailBodyLink() + "" + surveyEmailData.Account.Id + "/" + surveyEmailData.Year + "/" + surveyEmailData.Quarter + " </a>"
                    + "<br><br>Thank you<br>Regards,<br><b>Project Dashbaord Team</b>"
                    + "<br>-This is an auto generated email-"
                    + "</body></html>";


                var coreCount = Environment.ProcessorCount;
                var itemCount = surveyEmailData.ValidEmployees.Count;
                //var itemCount = 10;
                var batchSize = itemCount / coreCount;

                var pending = coreCount;
                using (var mre = new ManualResetEvent(false))
                {
                    for (int batchCount = 0; batchCount < coreCount; batchCount++)
                    {
                        var lower = batchCount * batchSize;
                        var upper = (batchCount == coreCount - 1) ? itemCount : lower + batchSize;
                        ThreadPool.QueueUserWorkItem(st =>
                        {
                            //foreach (int employee in surveyEmailData.ValidEmployees)
                            for (int i = lower; i < upper; i++)
                            {
                                TeamMembers member = teamMemberRepo.Get(surveyEmailData.ValidEmployees[i]);
                                string email = member.MemberName + "@99x.lk";
                                SendEmail(email, subject, body);
                            }
                            if (Interlocked.Decrement(ref pending) == 0)
                                mre.Set();
                        });
                    }
                    mre.WaitOne();
                    return true;
                }
            }
            else
            {
                return false;
            }





                //<a href="http://localhost:59252/">Visit our HTML tutorial</a>
            //    foreach (int employee in surveyEmailData.ValidEmployees) {
            //       TeamMembers member= teamMemberRepo.Get(employee);
            //        string email = member.MemberName + "@99x.lk";
            //        //string email = "ishanm" + "@99x.lk";
            //        SendEmail(email, subject, body);
            //    }
            //    return true;
            //}
            //else {
            //    return false;
            //}
        }


        public bool SendEmail(string recipient, string subject, string body)
        {
            try
            {
                EmailMessage message = new EmailMessage(service);
                message.Subject = subject;

                message.Body = body;

                message.ToRecipients.Add(recipient);
                message.Save();
                message.SendAndSaveCopy();
                System.Diagnostics.Debug.WriteLine(body);
                //Thread.Sleep(1000);

            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine("failed " + ex.Message);

            }

            return true;
        }
    }
}
