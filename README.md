Followed a tutorial using only Next.js APIs to figure out how Socket.io works, but there was an error that made the sockets fire twice. 

Ended up making another project with a separate backend that had the exact same issue.

Figured out that it was due to React 18 Strict Mode causing the issue, which could be turned off, but I wanted to figure out how to go about actually solving the issue.

For the Next/Node project all that was required was a socket.disconnect(). For this Next.js API tutorial, the fix was similar with a slight variation in syntax.
