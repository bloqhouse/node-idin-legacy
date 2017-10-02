package net.bankid.merchant.website;

import java.io.IOException;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.ParserConfigurationException;
import net.bankid.merchant.library.Configuration;
import net.bankid.merchant.library.Communicator;
import net.bankid.merchant.library.DirectoryResponse;
import org.xml.sax.SAXException;

public class Directory extends HttpServlet {
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
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            Configuration.defaultInstance().setMerchantID(request.getParameter("BankId.Merchant.MerchantID"));
            Configuration.defaultInstance().setMerchantSubID(Integer.parseInt(request.getParameter("BankId.Merchant.SubID")));
            Configuration.defaultInstance().setMerchantReturnUrl(request.getParameter("BankId.Merchant.ReturnUrl"));
            Configuration.defaultInstance().setAcquirerDirectoryURL(request.getParameter("BankId.Acquirer.DirectoryUrl"));
            
            DirectoryResponse dr = new Communicator().getDirectory();
            request.setAttribute("Model", dr);
        }
        catch (Exception ex) {
            throw new ServletException(ex.getMessage());
        }
        
        doCommon(request, response);
    }
    
    protected void doCommon(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        req.setAttribute("Config", Configuration.defaultInstance());
        RequestDispatcher rd = req.getRequestDispatcher("/WEB-INF/jsp/directory/index.jsp");
        rd.include(req, res);
    }
}
