using ProDashBoard.Model.Repository;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace ProDashBoard.Data
{
    public class AppSettingsRepository : IAppSettingsRepository
    {
        Configuration rootWebConfig;
        public AppSettingsRepository() {

            rootWebConfig=WebConfigurationManager.OpenWebConfiguration("~/Web.config");
        }

        public string getThreshold() {
            KeyValueConfigurationElement customSetting=null;
            if (rootWebConfig.AppSettings.Settings.Count > 0)
            {
                customSetting =
                    rootWebConfig.AppSettings.Settings["threshold"];
                if (customSetting != null) {
                    Debug.WriteLine("threshold " + customSetting.Value);

            } else
                Debug.WriteLine("No threshold application string");
            }
            return customSetting.Value;
        }

        public string getSpecLink()
        {
            KeyValueConfigurationElement customSetting = null;
            if (rootWebConfig.AppSettings.Settings.Count > 0)
            {
                customSetting =
                    rootWebConfig.AppSettings.Settings["specLink"];
                if (customSetting != null)
                {
                    Debug.WriteLine("specLink " + customSetting.Value);

                }
                else
                    Debug.WriteLine("No specLink application string");
            }
            return customSetting.Value;
        }

        public string getProcessComplianceLink()
        {
            KeyValueConfigurationElement customSetting = null;
            if (rootWebConfig.AppSettings.Settings.Count > 0)
            {
                customSetting =
                    rootWebConfig.AppSettings.Settings["processComplianceLink"];
                if (customSetting != null)
                {
                    Debug.WriteLine("processComplianceLink " + customSetting.Value);

                }
                else
                    Debug.WriteLine("No processComplianceLink application string");
            }
            return customSetting.Value;
        }

        public string getProcessComplianceVersion() {
            //processComplianceVersion
            KeyValueConfigurationElement customSetting = null;
            if (rootWebConfig.AppSettings.Settings.Count > 0)
            {
                customSetting =
                    rootWebConfig.AppSettings.Settings["processComplianceVersion"];
                if (customSetting != null)
                {
                    Debug.WriteLine("processComplianceVersion " + customSetting.Value);

                }
                else
                    Debug.WriteLine("No processComplianceVersion application string");
            }
            return customSetting.Value;
        }

        public bool getCorporateDashboard()
        {
            KeyValueConfigurationElement customSetting = null;
            if (rootWebConfig.AppSettings.Settings.Count > 0)
            {
                customSetting =
                    rootWebConfig.AppSettings.Settings["CorporateDashboard"];

                if (customSetting != null)
                {
                    Debug.WriteLine("CorporateDashboard " + customSetting.Value);
                    if (customSetting.Value == "true")
                    {
                        return true;
                    }
                    else if (customSetting.Value == "false")
                    {
                        return false;
                    }
                    else
                    {
                        Debug.WriteLine("Check web config");
                        return false;
                    }


                }
                else
                {
                    Debug.WriteLine("No CorporateDashboard application string");
                    return false;
                }
            }else { 
            return false;
            }
        }

    }
}
