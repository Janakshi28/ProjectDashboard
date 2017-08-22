using ProDashBoard.Data;
using ProDashBoard.Model;
using ProDashBoard.Repository;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ProDashBoard.Api
{
    public class EmailSenderController : ApiController
    {

        private EmailSenderRepository repo;
        private AuthorizationRepository authRepo;

        public EmailSenderController()
        {
            repo = new EmailSenderRepository();
            authRepo =new AuthorizationRepository();
        }
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        
        // POST api/<controller>
        [HttpPost, Route("api/EmailSender/sendSurveyEmail")]
        public HttpResponseMessage sendSurveyEmail([FromBody]SurveyEmail surveyEmail)
        {
            Debug.WriteLine(surveyEmail);
            if (authRepo.getAdminRights() || authRepo.getTeamLeadRights(surveyEmail.Account.Id))
            {
                return Request.CreateResponse(HttpStatusCode.OK, repo.sendTeamSatisfactionSurveyEmails(surveyEmail));
            }
            else {
                return Request.CreateResponse(HttpStatusCode.Forbidden,"Trying to trigger an unauthorized action. Access denied");
            }
           
           
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}