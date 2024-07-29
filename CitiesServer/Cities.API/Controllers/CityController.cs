using Cities.Core.Entities;
using Cities.Core.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Cities.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly ICityService _cityService;
        public CityController(ICityService cityService)
        {
            _cityService = cityService;
        }

        // GET: api/<CityController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            return Ok(await _cityService.GetListAsync());
        }

        // GET api/<CityController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            return Ok(await _cityService.GetByIdAsync(id));
        }

        // POST api/<CityController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] City city)
        {

            return Ok(await _cityService.AddAsync(city));
        }

        // PUT api/<CityController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] City city)
        {
            var city1 = await _cityService.GetByIdAsync(id);
            if (city1 is null)
                return NotFound();
            return Ok(await _cityService.UpdateAsync(id, city));
        }

        // DELETE api/<CityController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var city = await _cityService.GetByIdAsync(id);
            if (city is null)
                return NotFound();
            await _cityService.DeleteAsync(id);
            return NoContent();
        }
    }
}
