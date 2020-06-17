using System;
using System.Collections;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.api.Data;
using DatingApp.api.Dtos;
using DatingApp.api.Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.api.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController: ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;
        public UserController(IDatingRepository repo, IMapper mapper)
        {
           _repo = repo;
           _mapper = mapper;

        }

        [HttpGet]
        public async Task<IActionResult>  GetUsers()
        {
            var users = await _repo.GetUsers();
            var returnUsers =  _mapper.Map<IEnumerable<UserForListDto>>(users);
            return Ok(returnUsers);
        }

        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult>  GetUser(int id)
        {
            var user = await _repo.GetUser(id);
            var returnUser =  _mapper.Map<UserForDetailDto>(user);
            return Ok(returnUser);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userUpdateDto){

        if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(id);

             _mapper.Map(userUpdateDto, userFromRepo);

             if (await _repo.SaveAll())
                return NoContent();

             throw new Exception($"Updating user{id} failed on save");
        }

        
    }
}