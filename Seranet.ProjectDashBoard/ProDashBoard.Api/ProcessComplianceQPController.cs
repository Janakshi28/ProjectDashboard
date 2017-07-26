using ProDashBoard.Data;
using ProDashBoard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ProDashBoard.Api
{
    public class ProcessComplianceQPController : ApiController
    {
        private ProcessComplianceQPRepository repo;
        private AuthorizationRepository authRepo;

        public ProcessComplianceQPController()
        {
            repo = new ProcessComplianceQPRepository();
            authRepo = new AuthorizationRepository();
        }

        [HttpGet, Route("api/ProcessCompliance/getQualityParameters")]
        public HttpResponseMessage getQualityParameters()
        {
            if (authRepo.getAdminRights())
            {
                return Request.CreateResponse(HttpStatusCode.OK, repo.get());
            }
            else {
                return Request.CreateResponse(HttpStatusCode.Forbidden, "Unauthorized action. Access denied");
            }
            
        }

    }
}
