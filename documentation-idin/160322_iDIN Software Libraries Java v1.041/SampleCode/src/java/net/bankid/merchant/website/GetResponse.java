package net.bankid.merchant.website;

import java.io.IOException;
import java.lang.reflect.Field;
import java.security.Permission;
import java.security.PermissionCollection;
import java.util.Map;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.ParserConfigurationException;
import net.bankid.merchant.library.StatusRequest;
import net.bankid.merchant.library.StatusResponse;
import net.bankid.merchant.library.Communicator;
import net.bankid.merchant.library.Configuration;
import org.xml.sax.SAXException;

public class GetResponse extends HttpServlet {
    @Override
    public void init() throws ServletException {
        try {
            Configuration.defaultInstance().Load(getServletContext().getResourceAsStream("/WEB-INF/bankid-config.xml"));
        } catch (ParserConfigurationException | SAXException | IOException ex) {
            throw new ServletException(ex.getMessage());
        }
    }
    
    @Override
    protected void doGet(final HttpServletRequest request, final HttpServletResponse response)
            throws ServletException, IOException {
        doCommon(request, response);
    }
    
    @Override
    protected void doPost(final HttpServletRequest request, final HttpServletResponse response)
            throws ServletException, IOException {
        try {
            Configuration.defaultInstance().setMerchantID(request.getParameter("BankId.Merchant.MerchantID"));
            Configuration.defaultInstance().setMerchantSubID(Integer.parseInt(request.getParameter("BankId.Merchant.SubID")));
            Configuration.defaultInstance().setMerchantReturnUrl(request.getParameter("BankId.Merchant.ReturnUrl"));
            Configuration.defaultInstance().setAcquirerStatusURL(request.getParameter("BankId.Acquirer.StatusUrl"));
            
            StatusResponse sr = new Communicator().getResponse(new StatusRequest() {{
                transactionID = request.getParameter("transactionID");
            }});
            request.setAttribute("Model", sr);
        }
        catch (Exception ex) {
            throw new ServletException(ex.getMessage());
        }
        
        doCommon(request, response);
    }
    
    protected void doCommon(final HttpServletRequest req, final HttpServletResponse res)
            throws ServletException, IOException {
        req.setAttribute("Config", Configuration.defaultInstance());
        RequestDispatcher rd = req.getRequestDispatcher("/WEB-INF/jsp/getresponse/index.jsp");
        rd.include(req, res);
    }
}
