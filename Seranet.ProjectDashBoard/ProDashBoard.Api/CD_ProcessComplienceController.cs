using ProDashBoard.Data;
using ProDashBoard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ProDashBoard.Model;

namespace ProDashBoard.Api
{
    public class CD_ProcessComplienceController : ApiController
    {
        private CD_ProcessComplienceRepository repo;

        public CD_ProcessComplienceController()
        {
            repo = new CD_ProcessComplienceRepository();
        }

        //Getting All the details
        [HttpGet, Route("api/CD_ProcessComplienceController/get")]
        public HttpResponseMessage getProjects()
        {
            List<CD_SatisfactionData> returnData = repo.Get();
            return Request.CreateResponse(HttpStatusCode.OK, returnData);
        }

        //Getting Projects
        [HttpGet, Route("api/CD_ProcessComplienceController/getProjects/{Year}/{Quarter}")]
        public HttpResponseMessage getAllProjects(int Year, int Quarter)
        {
            List<CD_ProjectSatisfactionData> returnData = repo.GetProjects(Year, Quarter);
            return Request.CreateResponse(HttpStatusCode.OK, returnData);
        }


    }
}