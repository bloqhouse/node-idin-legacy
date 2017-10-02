<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

        <hr />
        <footer>
            <jsp:useBean id="date" class="java.util.Date" />
            <p>&copy; <fmt:formatDate value="${date}" pattern="yyyy" /> - BankId Merchant Website</p>
        </footer>
    </div>

    <script src="<c:url value="/public/js/jquery-1.10.2.min.js" />"></script>
    <script src="<c:url value="/public/js/bootstrap.min.js" />"></script>
</body>
</html>
