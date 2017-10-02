<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:include page="../_header.jsp"></jsp:include>

<h2>GetResponse</h2>
<hr/>

<div class="row">
    <form class="form-horizontal" method="post" role="form">
        <div class="form-group">
            <div class="col-xs-5">
                <label for="BankId.Acquirer.DirectoryUrl">BankId.Acquirer.StatusUrl</label>
                <input class="form-control" id="BankId.Acquirer.StatusUrl" name="BankId.Acquirer.StatusUrl" type="text" value="${Config.getAcquirerStatusURL()}">
            </div>
        </div>
        <div class="form-group">
            <div class="col-xs-3">
                <label for="transactionID">transactionID</label>
                <input class="form-control" id="transactionID" name="transactionID" type="text" value="1234567890123456">
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
        <button type="submit" class="btn btn-primary">Send response request</button>
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
	<c:if test="${Model.getErrorResponse().getAdditionalInformation() != 'null'}">
		<p>(saml) Status code (1): ${Model.getErrorResponse().getAdditionalInformation().getStatusCodeFirstLevel()}</p>
		<p>(saml) Status code (2): ${Model.getErrorResponse().getAdditionalInformation().getStatusCodeSecondLevel()}</p>
		<p>(saml) Status message: ${Model.getErrorResponse().getAdditionalInformation().getStatusMessage()}</p>
	</c:if>
</div>
</c:if>

<c:if test="${Model.getIsError() == false}">
    <div class="row">
        <p>Status Codes:</p>
        <pre>StatusCodeFirstLevel = ${Model.getSamlResponse().getStatus().getStatusCodeFirstLevel()}</pre>
        <pre>StatusCodeSecondLevel = ${Model.getSamlResponse().getStatus().getStatusCodeSecondLevel()}</pre>
    </div>
    <hr/>
    <c:if test="${Model.getStatus() == 'Success'}">
        <div class="row">
            <p>Attributes:</p>
            <c:forEach items="${Model.getSamlResponse().getAttributes()}" var="entry">
                <pre>${entry.key} = ${entry.value}</pre>
            </c:forEach>
        </div>
    </c:if>
    <c:if test="${Model.getStatus() != 'Success'}">
        <div class="row">
            <pre>Status = ${Model.getStatus()}</pre>
        </div>
    </c:if>

<hr/>

<div class="row">
    <textarea readonly="true" class="form-control" rows="10">${Model.getRawMessage()}</textarea>
</div>
</c:if>

<jsp:include page="../_footer.jsp"></jsp:include>
