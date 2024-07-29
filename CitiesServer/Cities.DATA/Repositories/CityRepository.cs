using Cities.Core.Entities;
using Cities.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cities.Data.Repositories
{
    public class CityRepository:ICityRepository
    {
        private readonly DataContext _context;
        public CityRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<City>>GetListAsync()
        {
            return await _context.Cities.ToListAsync();
        }
        public async Task<City> GetByIdAsync(int id)
        {
            return await _context.Cities.FindAsync(id);
        }
        public async Task<City> AddAsync(City city)
        {
            // בדוק אם העיר כבר קיימת
            var existingCity = await _context.Cities.FirstOrDefaultAsync(c => c.Name == city.Name);
            if (existingCity != null)
            {
                return null;
            }

            // אם העיר לא קיימת, מוסיפים אותה
            await _context.Cities.AddAsync(city);
            await _context.SaveChangesAsync();
            return city;
        }
        public async Task<City> UpdateAsync(int id, City city)
        {
            // בדוק אם שם העיר החדש כבר קיים אצל עיר אחרת
            var existCity = await _context.Cities.FirstOrDefaultAsync(c => c.Name == city.Name && c.Id != id);
            if (existCity != null)
            {
                return null;
            }

            // עדכן את שם העיר ושמור את השינויים
            existCity = await GetByIdAsync(id);
            existCity.Name = city.Name;
            await _context.SaveChangesAsync();
            return existCity;
        }
        public async Task DeleteAsync(int id)
        {
            var city = await GetByIdAsync(id);
            _context.Cities.Remove(city);
            await _context.SaveChangesAsync();
        }

    }
}
