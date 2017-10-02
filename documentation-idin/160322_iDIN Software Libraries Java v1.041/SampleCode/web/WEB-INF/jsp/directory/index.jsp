<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:include page="../_header.jsp"></jsp:include>

<h2>Directory</h2>
<hr/>

<div class="row">
    <form class="form-horizontal" method="post" role="form">
        <div class="form-group">
            <div class="col-xs-5">
                <label for="BankId.Acquirer.DirectoryUrl">BankId.Acquirer.DirectoryUrl</label>
                <input class="form-control" id="BankId.Acquirer.DirectoryUrl" name="BankId.Acquirer.DirectoryUrl" type="text" value="${Config.getAcquirerDirectoryURL()}">
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
            
        <button type="submit" class="btn btn-primary">Send directory request</button>
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
    <select class="form-control">
        <option>Choose a bank</option>
        <c:forEach items="${Model.getIssuersByCountry()}" var="country">
            <optgroup label="${country.key}">
                <c:forEach items="${country.value}" var="issuer">
                    <option value="${issuer.getIssuerID()}">${issuer.getIssuerName()}</option>
                </c:forEach>
            </optgroup>
        </c:forEach>
    </select>
</div>

<hr/>

<div class="row">
    <textarea readonly="true" class="form-control" rows="10">${Model.getRawMessage()}</textarea>
</div>
</c:if>


<jsp:include page="../_footer.jsp"></jsp:include>
