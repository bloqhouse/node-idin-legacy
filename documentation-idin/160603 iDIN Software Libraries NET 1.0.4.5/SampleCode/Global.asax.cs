using System.Diagnostics;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace BankId.Merchant.Library.SampleWebsite
{
    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            ModelBinders.Binders.Add(typeof(decimal), new DecimalModelBinder());

            Configuration.Load();
            
            Trace.Listeners.Add(new CustomTraceListener());
        }
    }
}
