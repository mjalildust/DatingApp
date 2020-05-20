using System;
using System.Collections.Generic;
using System.Linq;
using DatingApp.api.Models;
using Newtonsoft.Json;

namespace DatingApp.api.Data
{
    public class Seed
    {
        public static void SeedUsers(DataContext context)
        {
            if (!context.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);
                foreach (var user in users)
                {
                    byte[] passwordhash, passwordSalt;
                    CreatePasswordHash("password", out passwordhash, out passwordSalt);

                    user.PasswordHash = passwordhash;
                    user.PasswordSalt = passwordSalt;
                    user.Username = user.Username.ToLower();
                    context.Users.Add(user);
                }
                context.SaveChanges();
            }

        }

      private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
           using(var hamc = new System.Security.Cryptography.HMACSHA512())
           {
               passwordSalt = hamc.Key;
               passwordHash = hamc.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
           }
        }
    }
}