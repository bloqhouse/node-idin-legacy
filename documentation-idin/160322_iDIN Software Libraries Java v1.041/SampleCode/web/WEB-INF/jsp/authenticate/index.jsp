<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:include page="../_header.jsp"></jsp:include>

<h2>Authenticate</h2>
<hr/>

<div class="row">
    <form class="form-horizontal" method="post" role="form">
        <div class="form-group">
            <div class="col-xs-5">
                <label for="BankId.Acquirer.DirectoryUrl">BankId.Acquirer.TransactionUrl</label>
                <input class="form-control" id="BankId.Acquirer.TransactionUrl" name="BankId.Acquirer.TransactionUrl" type="text" value="${Config.getAcquirerTransactionURL()}">
            </div>
        </div>
        <div class="form-group">
            <div class="col-xs-3">
                <label for="issuerID">issuerID</label>
                <input class="form-control" id="issuerID" name="issuerID" type="text" value="INGBNL2A">
            </div>
            <div class="col-xs-3">
                <label for="issuerID">expirationPeriod</label>
                <input class="form-control" id="expirationPeriod" name="expirationPeriod" type="text" value="PT5M">
            </div>
            <div class="col-xs-3">
                <label for="Language">language</label>
                <select class="form-control" id="Language" name="language">
                    <option selected="selected">en</option>
                    <option>nl</option>
                </select>
            </div>
            <div class="col-xs-3">
                <label for="issuerID">entranceCode</label>
                <input class="form-control" id="entranceCode" name="entranceCode" type="text" value="entranceCode">
            </div>
        </div>
        <div class="form-group">
            <div class="col-xs-3">
                <label for="issuerID">BankId.MerchantReference</label>
                <input class="form-control" id="BankId.MerchantReference" name="BankId.MerchantReference" type="text" value="merchantReference">
            </div>
            <div class="col-xs-3">
                <label for="issuerID">BankId.RequestedServiceId</label>
                <input class="form-control" id="BankId.RequestedServiceId" name="BankId.RequestedServiceId" type="text" value="17600">
            </div>
            <div class="col-xs-3">
                <label for="Language">BankId.LOA</label>
                <select class="form-control" id="BankId.LOA" name="BankId.LOA">
                    <option selected="selected">Loa2</option>
                    <option>Loa3</option>
                </select>
            </div>
        </div>
            
        <button type="button" class="btn btn-danger" data-toggle="collapse" data-target="#demo">Toggle more options</button>
        <div id="demo" class="collapse">
            <div class="form-group">
                <div class="col-xs-3">
                    <label for="BankId.Merchant.MerchantID">BankId.Merchant.MerchantID</label>
                    <input class="form-control" id="BankId.Merchant.MerchantID" name="BankId.Merchant.MerchantID" type="text" value="${Config.getMerchantID()}">
                </div>
            </div>
            <div class="form-group">
                <div class="col-xs-3">
                    <label for="BankId.Merchant.SubID">BankId.Merchant.SubID</label>
                    <input class="form-control" id="BankId.Merchant.SubID" name="BankId.Merchant.SubID" type="text" value="${Config.getMerchantSubID()}">
                </div>
            </div>
            <div class="form-group">
                <div class="col-xs-3">
                    <label for="BankId.Merchant.SubID">BankId.Merchant.ReturnUrl</label>
                    <input class="form-control" id="BankId.Merchant.ReturnUrl" name="BankId.Merchant.ReturnUrl" type="text" value="${Config.getMerchantReturnUrl()}">
                </div>
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Send authentication request</button>
    </form>
</div>

<hr/>

<c:if test="${Model.getIsError() == true}">
<div class="row alert alert-danger" role="alert">
    <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
    
    <p>(iDx) Code: ${Model.getErrorResponse().getErrorCode()}</p>
    <p>(iDx) Message: ${Model.getErrorResponse().getErrorMessage()}</p>
    <p>(iDx) Details: ${Model.getErrorResponse().getErrorDetails()}</p>
    <p>(iDx) Consumer message: ${Model.getErrorResponse().getConsumerMessage()}</p>
    <p>(iDx) Suggested action: ${Model.getErrorResponse().getSuggestedAction()}</p>   
</div>
</c:if>

<c:if test="${Model.getIsError() == false}">
<div class="row">
    <pre>IssuerAuthenticationUrl = ${Model.getIssuerAuthenticationURL()}</pre>
    <pre>TransactionID = ${Model.getTransactionID()}</pre>
    <pre>TransactionCreateDateTimestamp = ${Model.getTransactionCreateDateTimestamp()}</pre>
</div>

<hr/>

<div class="row">
    <textarea readonly="true" class="form-control" rows="10">${Model.getRawMessage()}</textarea>
</div>
</c:if>

<jsp:include page="../_footer.jsp"></jsp:include>
