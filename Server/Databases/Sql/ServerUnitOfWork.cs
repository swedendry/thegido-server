using Server.Databases.Sql.Core;
using Server.Databases.Sql.Models;

namespace Server.Databases.Sql
{
    public interface IServerUnitOfWork : IUnitOfWork
    {
        IRepository<Manager> Managers { get; }
        IRepository<User> Users { get; }
        IRepository<Video> Videos { get; }
    }

    public class ServerUnitOfWork : UnitOfWork, IServerUnitOfWork
    {
        public ServerUnitOfWork(ServerContext context)
            : base(context)
        { }

        private IRepository<Manager> managers;
        public IRepository<Manager> Managers => managers ??= new Repository<ServerUnitOfWork, Manager>(this);

        private IRepository<User> users;
        public IRepository<User> Users => users ??= new Repository<ServerUnitOfWork, User>(this);

        private IRepository<Video> videos;
        public IRepository<Video> Videos => videos ??= new Repository<ServerUnitOfWork, Video>(this);
    }
}
