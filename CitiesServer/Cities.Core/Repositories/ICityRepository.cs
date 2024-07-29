using Cities.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cities.Core.Repositories
{
    public interface ICityRepository
    {
        Task<IEnumerable<City>> GetListAsync();
        Task<City> GetByIdAsync(int id);
        Task<City> AddAsync(City city);
        Task<City> UpdateAsync(int id, City city);
        Task DeleteAsync(int id);
    }
}
