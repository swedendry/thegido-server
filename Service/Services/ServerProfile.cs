using AutoMapper;
using Service.Databases.Sql.Models;

namespace Service.Services
{
    public class ServerProfile : Profile
    {
        public ServerProfile()
        {
            CreateMap<Manager, ManagerViewModel>();
            CreateMap<User, UserViewModel>();
            CreateMap<Video, VideoViewModel>();
        }
    }
}
