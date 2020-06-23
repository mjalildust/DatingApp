using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.api.Helper;
using DatingApp.api.Models;

namespace DatingApp.api.Data
{
    public interface IDatingRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task <bool> SaveAll();
         Task <PagedList<User>> GetUsers(UserParams userParams);
         Task <User> GetUser(int id);   
    }
}