<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:include page="../_header.jsp"></jsp:include>

<div class="jumbotron">
    <h1>BankId Merchant Website</h1>
    <p class="lead">This is a test website for the BankId Merchant Library. Available actions:</p>
    <p>
        <a href="<c:url value="/Directory/" />" class="btn btn-primary btn-lg">Directory &raquo;</a>
        <a href="<c:url value="/Authenticate/" />" class="btn btn-primary btn-lg">Authenticate &raquo;</a>
        <a href="<c:url value="/GetResponse/" />" class="btn btn-primary btn-lg">GetResponse &raquo;</a>
    </p>
</div>

<jsp:include page="../_footer.jsp"></jsp:include>
