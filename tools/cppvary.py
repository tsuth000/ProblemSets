# Compile and run the C++ lesson snippets dumped by cppvary.js; report any whose output differs from the keyed answer.
import json
from concurrent.futures import ThreadPoolExecutor
from cxx import run_cpp
HEAD = '#include <bits/stdc++.h>\nusing namespace std;\nnamespace fs = std::filesystem;\n'
items = json.load(open('/tmp/claude-0/cppvary.json'))
srcs = [f"{HEAD}{i['head']}\nint main() {{\n{i['body']}\n}}\n" for i in items]
with ThreadPoolExecutor(3) as ex: outs = list(ex.map(run_cpp, srcs))
bad = 0
for i, o in zip(items, outs):
    o = o.strip(); w = i['want']
    if w in ('It does not compile', 'Does not compile'): ok = o.startswith('COMPILE ERROR')
    elif w == 'Undefined behavior': ok = o.startswith('RUNTIME')
    elif isinstance(w, str): ok = o == w
    else:
        try: ok = float(o) == w
        except ValueError: ok = False
    if not ok: bad += 1; print('MISMATCH', i['id'], repr(o[:200]), 'want', w)
print(f'{len(items)} snippets; {bad} mismatches')
