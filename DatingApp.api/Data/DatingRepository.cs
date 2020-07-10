using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.api.Helper;
using DatingApp.api.Models;
using DatingApp.API.Helpers;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.api.Data
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DataContext _context;
        public DatingRepository(DataContext context)
        {
            _context = context;
        }
        public  void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Like> GetLike(int userId, int recipientId)
        {
            return await _context.Likes.FirstOrDefaultAsync(u => u.LikerId == userId && u.LikeeId == recipientId);
        }

        public async Task<User> GetUser(int id)
        {
           var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);
           return user;
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            
            var users =  _context.Users.Include(p=> p.Photos).OrderByDescending(u => u.LastActive)
            .AsQueryable();
            users = users.Where(u=> u.Id != userParams.UserId);
            users = users.Where(u=> u.Gender == userParams.Gender);

            if (userParams.Likers)
            {
                var userLikers = await GetUserLikes(userParams.UserId, userParams.Likers);
                users = users.Where(x => userLikers.Contains(x.Id));
            }
            if (userParams.Likees)
            {
                 var userLikees = await GetUserLikes(userParams.UserId, userParams.Likers);
                users = users.Where(x => userLikees.Contains(x.Id));
            }


            if ( userParams.MinAge != 18 || userParams.MaxAge != 99)
            {
                var minDob = DateTime.Today.AddYears(-userParams.MaxAge);
                var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

                users = users.Where(u=> u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);
            }

            if (!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch(userParams.OrderBy)
                {
                 case "created":
                     users = users.OrderByDescending(u=> u.Created);
                     break;
                 default:
                     users = users.OrderByDescending(u => u.LastActive);
                     break;

                }
            }

            return await PagedList<User>.CreateAsync(users, userParams.PageNumber,userParams.PageSize);
        }

        private async Task<IEnumerable<int>> GetUserLikes(int id, bool likers)
        {
             var users = await _context.Users.Include(u => u.Likers)
                                             .Include(u => u.Likees)
                                             .FirstOrDefaultAsync(u => u.Id == id);

            if (likers)
            {
                return users.Likers.Where(u => u.LikeeId == id).Select(i => i.LikerId);
                
            }
            else
            {
                return users.Likees.Where(u => u.LikerId == id).Select(i => i.LikeeId);
            }
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public Task<Message> GetMessage(int id)
        {
            return _context.Messages.FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<PagedList<Message>> GetUserMessages(MessageParams messageParams)
        {
            var message =  _context.Messages
                    .Include(u => u.Sender).ThenInclude(p=> p.Photos)
                    .Include(u => u.Recipient).ThenInclude(p=> p.Photos)
                    .AsQueryable();

                switch(messageParams.MessageContainer){
                    case "Inbox": 
                        message = message.Where(u => u.RecipientId == messageParams.UserId && u.RecipientDeleted == false);
                        break;
                    case "Outbox":
                        message = message.Where(u => u.SenderId == messageParams.UserId && u.SenderDeleted == false);
                        break;
                    default:
                     message = message.Where(u => u.RecipientId == messageParams.UserId && u.RecipientDeleted == false && u.IsRead == false);
                     break;

                }
                message = message.OrderByDescending(d => d.MessageSent);
                return await PagedList<Message>.CreateAsync(message, messageParams.PageNumber, messageParams.PageSize);
        }

        public async Task<IEnumerable<Message>> GetMessagetThread(int userId, int reciepId)
        {
            var messages = await _context.Messages.Include(u => u.Sender).ThenInclude(p => p.Photos).
                Include(u => u.Recipient).ThenInclude(p => p.Photos).
                Where(m => m.RecipientId == userId && m.SenderId == reciepId || m.RecipientId == reciepId && m.SenderId == userId).
                OrderByDescending(m => m.MessageSent).ToListAsync();

                return messages;
        }
    }
}