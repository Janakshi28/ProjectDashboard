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
    public class CD_NPSController: ApiController
    {
        private CD_NPSRepository repo;

        public CD_NPSController()
        {
            repo = new CD_NPSRepository();
        }

        //Getting All the details
        [HttpGet, Route("api/CD_NPSController/get")]
        public HttpResponseMessage getProjects()
        {
            List<CD_SatisfactionData> returnData = repo.Get();
            return Request.CreateResponse(HttpStatusCode.OK, returnData);
        }

        //Getting Projects
        [HttpGet, Route("api/CD_NPSController/getProjects/{Year}/{Quarter}")]
        public HttpResponseMessage getAllProjects(int Year, int Quarter)
        {
            List<CD_ProjectSatisfactionData> returnData = repo.GetProjects(Year, Quarter);
            return Request.CreateResponse(HttpStatusCode.OK, returnData);
        }
    }

}
