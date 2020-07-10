using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.api.Helper;
using DatingApp.api.Models;
using DatingApp.API.Helpers;

namespace DatingApp.api.Data
{
    public interface IDatingRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task <bool> SaveAll();
         Task <PagedList<User>> GetUsers(UserParams userParams);
         Task <User> GetUser(int id);   
        Task <Like> GetLike(int userId, int recipientId);
        Task <Message> GetMessage(int id);
        Task <PagedList<Message>> GetUserMessages(MessageParams messageParams);
        Task <IEnumerable<Message>> GetMessagetThread(int userId, int reciepId);
    }
}