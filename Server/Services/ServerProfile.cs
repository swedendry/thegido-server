using AutoMapper;
using Server.Databases.Sql.Models;

namespace Server.Services
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
