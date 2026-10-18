# Shared g++ runner for C++ questions: compile with UBSan + ASan against a precompiled <bits/stdc++.h>, run, cache by source hash.
import hashlib, subprocess, tempfile, os, shutil
from concurrent.futures import ThreadPoolExecutor
CXX = os.path.join(tempfile.gettempdir(), 'pscxx'); os.makedirs(CXX, exist_ok=True)
FLAGS = ['-std=c++20', '-O0', '-w', '-fsanitize=undefined,address', '-fno-sanitize-recover=all', '-pthread']
PCH = os.path.join(CXX, 'all.h')
if not os.path.exists(PCH + '.gch'):
    open(PCH, 'w').write('#include <bits/stdc++.h>\n')
    subprocess.run(['g++', *FLAGS, '-x', 'c++-header', PCH, '-o', PCH + '.gch'], check=True)
def run_cpp(src):
    h = hashlib.sha1(src.encode()).hexdigest()[:16]; out = os.path.join(CXX, h + '.out')
    if os.path.exists(out): return open(out).read()
    cc = os.path.join(CXX, h + '.cpp'); exe = os.path.join(CXX, h)
    open(cc, 'w').write(src)
    r = subprocess.run(['g++', *FLAGS, '-include', PCH, cc, '-o', exe], capture_output=True, text=True)
    if r.returncode: res = 'COMPILE ERROR: ' + r.stderr[:1500]
    else:
        try:
            # Each program runs in its own empty directory, so file-I/O questions start from a clean slate.
            wd = tempfile.mkdtemp(dir=CXX)
            try: p = subprocess.run([exe], capture_output=True, text=True, timeout=10, cwd=wd)
            finally: shutil.rmtree(wd, ignore_errors=True)
            res = p.stdout if p.returncode == 0 else f'RUNTIME {p.returncode}: ' + (p.stdout + p.stderr)[:400]
        except subprocess.TimeoutExpired: res = 'TIMEOUT'
        os.remove(exe)
    open(out, 'w').write(res); return res
