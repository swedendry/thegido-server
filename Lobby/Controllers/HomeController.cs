using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Lobby.Controllers
{
    [Route("[controller]")]
    public class HomeController : Controller
    {
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "welcom thegido server" };
        }
    }
}
