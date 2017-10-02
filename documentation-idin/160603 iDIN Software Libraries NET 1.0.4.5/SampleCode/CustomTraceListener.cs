using System.Diagnostics;
using System.IO;
using System.Web.Hosting;

namespace BankId.Merchant.Library.SampleWebsite
{
    class CustomTraceListener : TraceListener
    {
        public override void Write(string message)
        {
            lock(this)
            {
                using (var sw = new StreamWriter(Path.Combine(HostingEnvironment.ApplicationPhysicalPath, "App_Data/logs/info-log.txt"), true))
                {
                    sw.WriteLine(message);
                }
            }
        }

        public override void WriteLine(string message)
        {
            lock (this)
            {
                using (var sw = new StreamWriter(Path.Combine(HostingEnvironment.ApplicationPhysicalPath, "App_Data/logs/info-log.txt"), true))
                {
                    sw.WriteLine(message);
                }
            }
        }
    }
}