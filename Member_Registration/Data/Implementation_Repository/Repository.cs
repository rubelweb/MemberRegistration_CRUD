using Member_Registration.Data;
using Member_Registration.Data.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Member_Registration.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly RegistrationContext Context;
        public Repository(RegistrationContext context)
           => Context = context;
        public void Create(T entity)
        {
            Context.Set<T>().Add(entity);
            Save();
        }
        public IEnumerable<T> GetAll()
            => Context.Set<T>();
        public T GetById(int id)
            => Context.Set<T>().Find(id);
        public void Delete(int id)
        {
            var dbMember= Context.Set<T>().Find(id);
            Context.Remove(dbMember);
            Save();
        }
        public void Update(T entity)
        {
            Context.Entry(entity).State = EntityState.Modified;
            Save();
        }
        protected void Save() 
            => Context.SaveChanges();
    }
}
