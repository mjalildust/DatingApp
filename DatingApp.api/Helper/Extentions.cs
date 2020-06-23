using System;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace DatingApp.api.Helper
{
    public static class Extentions
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }

        public static void AddPagination(this HttpResponse response, int currentPage, int itemPerPage, int totalItems, int totalPages )
        {
            var paginationHeader =  new PaginationHeader(currentPage, itemPerPage, totalItems, totalPages);
            var camelCaseFprmatter = new JsonSerializerSettings();
            camelCaseFprmatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            
            response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationHeader, camelCaseFprmatter));
             response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }

        public static int CalculatAge(this DateTime TheDateTime)
        {
            var age = DateTime.Today.Year - TheDateTime.Year;
            if (TheDateTime.AddYears(age) > DateTime.Today)
                age--;
            
            return age; 
        }

        
    }
}