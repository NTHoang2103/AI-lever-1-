// ...existing code...
/**
 * Logic chính của ProBot App.
 * Lắng nghe sự kiện 'issues.opened' và đăng bình luận chào mừng.
 */
const welcomeBot = (app) => {
    // Lắng nghe sự kiện 'issues.opened'
    app.on('issues.opened', async (context) => {
        // 1. Lấy thông tin Issue và người dùng (user)
        const issue = context.payload.issue;
        const repo = context.payload.repository;
        if (!issue.user?.login) {
            context.log.warn(`Issue #${issue.number} không có thông tin user; bỏ qua gửi tin nhắn chào mừng`);
            return;
        }
        const user = issue.user.login;
        // 2. Tùy chỉnh tin nhắn chào mừng (có thể dùng Markdown)
        const welcomeMessage = `
      👋 Chào mừng **@${user}** đến với kho lưu trữ **${repo.full_name}**!

      Cảm ơn bạn đã mở Issue này. Chúng tôi rất trân trọng sự đóng góp của bạn. 
      Để giúp đội ngũ xem xét nhanh hơn, vui lòng đảm bảo Issue có mô tả chi tiết và các bước tái hiện (nếu có).

      Vui lòng kiên nhẫn chờ đợi, chúng tôi sẽ phản hồi sớm nhất có thể.

      *(Đây là một tin nhắn tự động từ Bot Chào mừng của chúng tôi)*
    `;
        // 3. Chuẩn bị đối tượng bình luận
        // context.issue() tự động thêm owner, repo, và issue_number
        const issueComment = context.issue({
            body: welcomeMessage,
        });
        // 4. Gửi bình luận đến GitHub API
        try {
            await context.octokit.rest.issues.createComment(issueComment);
            context.log.info(`Đã gửi tin nhắn chào mừng cho Issue #${issue.number} từ ${user}`);
        }
        catch (error) {
            context.log.error(`Lỗi khi gửi bình luận: ${error}`);
        }
    });
};
export default welcomeBot; // Dùng export default thay vì export =
// ...existing code...
