package net.bankid.merchant.website;

import java.io.IOException;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.Duration;
import javax.xml.parsers.ParserConfigurationException;
import net.bankid.merchant.library.AssuranceLevel;
import net.bankid.merchant.library.AuthenticationRequest;
import net.bankid.merchant.library.AuthenticationResponse;
import net.bankid.merchant.library.Configuration;
import net.bankid.merchant.library.Communicator;
import net.bankid.merchant.library.ServiceId;
import org.xml.sax.SAXException;

public class Authenticate extends HttpServlet {
    @Override
    public void init() throws ServletException {
        try {
            Configuration.defaultInstance().Load(getServletContext().getResourceAsStream("/WEB-INF/bankid-config.xml"));
        } catch (ParserConfigurationException | SAXException | IOException ex) {
            throw new ServletException(ex.getMessage());
        }
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doCommon(request, response);
    }
    
    @Override
    protected void doPost(final HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            Configuration.defaultInstance().setMerchantID(request.getParameter("BankId.Merchant.MerchantID"));
            Configuration.defaultInstance().setMerchantSubID(Integer.parseInt(request.getParameter("BankId.Merchant.SubID")));
            Configuration.defaultInstance().setMerchantReturnUrl(request.getParameter("BankId.Merchant.ReturnUrl"));
            Configuration.defaultInstance().setAcquirerTransactionURL(request.getParameter("BankId.Acquirer.TransactionUrl"));
            
            String exp = request.getParameter("expirationPeriod");
            final Duration duration =
                (exp != null && !exp.isEmpty())? DatatypeFactory.newInstance().newDuration(exp) : null;
            
            AuthenticationResponse tr = new Communicator().newAuthenticationRequest(new AuthenticationRequest() {{
                setEntranceCode(request.getParameter("entranceCode"));
                setExpirationPeriod(duration);
                setIssuerID(request.getParameter("issuerID"));
                setLanguage(request.getParameter("language"));
                setAssuranceLevel(AssuranceLevel.valueOf(request.getParameter("BankId.LOA")));
                setMerchantReference(request.getParameter("BankId.MerchantReference"));
                setRequestedServiceID(new ServiceId(request.getParameter("BankId.RequestedServiceId")));
            }});
            request.setAttribute("Model", tr);
        }
        catch (Exception ex) {
            throw new ServletException(ex.getMessage());
        }
        
        doCommon(request, response);
    }
    
    protected void doCommon(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        req.setAttribute("Config", Configuration.defaultInstance());
        RequestDispatcher rd = req.getRequestDispatcher("/WEB-INF/jsp/authenticate/index.jsp");
        rd.include(req, res);
    }
}
