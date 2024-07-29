using Cities.Core.Entities;
using Cities.Core.Repositories;
using Cities.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cities.Service
{
    public class CityService:ICityService
    {
        private readonly ICityRepository _cityRepository;
        public CityService(ICityRepository cityRepository)
        {
            _cityRepository = cityRepository;
        }
        public async Task<IEnumerable<City>> GetListAsync()
        {
            return await _cityRepository.GetListAsync();
        }
        public async Task<City> GetByIdAsync(int id)
        {
            return await _cityRepository.GetByIdAsync(id);
        }
        public async Task<City> AddAsync(City city)
        {
            return await _cityRepository.AddAsync(city);
        }
        public async Task<City> UpdateAsync(int id, City city)
        {
            return await _cityRepository.UpdateAsync(id, city); 
        }

        public async Task DeleteAsync(int id)
        {
            await _cityRepository.DeleteAsync(id);   
        }
    }
}
