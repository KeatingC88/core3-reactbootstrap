using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React_Bootstrap.Controllers
{
    public class UsersDTO
    {
        public long Id { get; set; }
        public string Email { get; set; }
        public bool Admin { get; set; }
        public bool Active { get; set; }
    }
}
