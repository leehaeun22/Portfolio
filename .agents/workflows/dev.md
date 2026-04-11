---
description: Run development environment and automatically fix errors
---

# 자동 개발 및 오류 수정 워크플로우

이 워크플로우는 프론트엔드와 백엔드를 동시에 실행하고, 발생하는 오류를 자동으로 감지하여 수정합니다.

// turbo-all
1. 루트 디렉토리에서 개발 서버 실행
```bash
npm run dev
```

2. 터미널 출력 모니터링
   - `command_status`를 사용하여 주기적으로 로그를 확인합니다.
   - "Error", "Exception", "Failed to compile" 등의 키워드가 있는지 확인합니다.

3. 오류 자동 수정
   - 오류가 발견되면 로그를 분석하여 원인 파악 (파일 경로, 라인 번호, 에러 메시지)
   - `view_file`로 해당 코드를 확인
   - `replace_file_content` 또는 `multi_replace_file_content`로 코드 수정
   - 수정 후 자동으로 프로세스가 재시작되는지 확인 (Next.js/NestJS의 watch 모드 활용)

4. 완료 보고
   - 모든 서비스가 정상적으로 실행되면 사용자에게 알림
