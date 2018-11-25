using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Member_Registration.Data.Model
{
    public class Member
    {
        public int MemberID { get; set; }       
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }      
    }
}
