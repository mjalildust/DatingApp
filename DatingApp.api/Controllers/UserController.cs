using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.api.Data;
using DatingApp.api.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.api.Controllers
{
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

        [HttpGet("{id}")]
        public async Task<IActionResult>  GetUser(int id)
        {
            var user = await _repo.GetUser(id);
            var returnUser =  _mapper.Map<UserForDetailDto>(user);
            return Ok(returnUser);
        }

        
    }
}