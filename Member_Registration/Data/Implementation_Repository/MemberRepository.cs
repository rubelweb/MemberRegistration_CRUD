using Member_Registration.Data;
using Member_Registration.Data.Interfaces;
using Member_Registration.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Member_Registration.Repository
{
    public class MemberRepository : Repository<Member>, IMemberRepository
    {   
        public MemberRepository(RegistrationContext context) : base(context)
        {            
        }

        // No specific methods implemented here..
    }
}
