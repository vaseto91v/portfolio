
import type { NextRequest } from 'next/server';
import { Document, Page, Text, View, StyleSheet, pdf, Font } from '@react-pdf/renderer';
import { getInfo, UI } from '@/data/content';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';


type ReadableLike = {
  on(event: 'data', cb: (chunk: unknown) => void): void;
  on(event: 'end', cb: () => void): void;
  on(event: 'error', cb: (err: unknown) => void): void;
};
const isReadableLike = (x: unknown): x is ReadableLike =>
  typeof x === 'object' && x !== null && typeof (x as any).on === 'function';

const concatU8 = (chunks: Uint8Array[]) => {
  let len = 0; for (const c of chunks) len += c.byteLength;
  const out = new Uint8Array(len);
  let off = 0; for (const c of chunks) { out.set(c, off); off += c.byteLength; }
  return out;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lang = (searchParams.get('lang') === 'bg' ? 'bg' : 'en') as 'en' | 'bg';
  const theme = (searchParams.get('theme') === 'dark' ? 'dark' : 'light') as 'light' | 'dark';


  const regularUrl = new URL('/shots/fonts/NotoSans-Light.ttf', req.url).toString();
  const boldUrl    = new URL('/shots/fonts/NotoSans-Light.ttf', req.url).toString();


  Font.register({
    family: 'NotoSans',
    fonts: [
      { src: regularUrl, fontWeight: 'normal', fontStyle: 'normal' },
      { src: boldUrl,    fontWeight: 'bold',   fontStyle: 'normal' },
    ],
  });

  const data = getInfo(lang);
  const t = lang === 'en' ? UI.en : UI.bg;
  const isDark = theme === 'dark';

  const colors = isDark
    ? { bg: '#0a0a0a', text: '#fafafa', sub: '#d4d4d4', border: '#27272a', badgeBg: '#18181b' }
    : { bg: '#ffffff', text: '#0a0a0a', sub: '#525252', border: '#e5e7eb', badgeBg: '#f4f4f5' };

  const styles = StyleSheet.create({
    page: { padding: 32, fontSize: 10, color: colors.text, backgroundColor: colors.bg, fontFamily: 'NotoSans' },
    h1: { fontSize: 22, fontWeight: 'bold' },
    h2: { fontSize: 14, marginTop: 16, marginBottom: 6, fontWeight: 'bold' },
    sub: { color: colors.sub },
    row: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
    section: { marginTop: 8, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 8 },
    badge: { fontSize: 8, paddingHorizontal: 6, paddingVertical: 3, borderRadius: 10, backgroundColor: colors.badgeBg, color: colors.text, marginRight: 4, marginBottom: 4 },
    li: { flexDirection: 'row', marginBottom: 3 },
    bullet: { width: 8, textAlign: 'center' as const },
    jobHeader: { flexDirection: 'row', justifyContent: 'space-between' },
    tiny: { fontSize: 8 },
  });

  const Doc = (
    <Document title={`Vasil Vasilev CV (${lang.toUpperCase()})`}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View>
          <Text style={styles.h1}>{data.name}</Text>
          <Text style={styles.sub}>{data.tag}</Text>
          <View style={[styles.row, { marginTop: 6 }]}>
            <Text style={styles.sub}>{data.location}</Text>
            <Text style={styles.sub}>•</Text>
            <Text style={styles.sub}>{data.email}</Text>
            <Text style={styles.sub}>•</Text>
            <Text style={styles.sub}>{data.phone}</Text>
            {data.github ? (<><Text style={styles.sub}>•</Text><Text style={styles.sub}>{data.github}</Text></>) : null}
          </View>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.h2}>Summary</Text>
          <Text>{data.summary}</Text>
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.h2}>{t.coreSkills}</Text>
          <View style={[styles.row, { marginTop: 4 }]}>
            {data.skills.map((s, i) => (<Text key={i} style={styles.badge}>{s}</Text>))}
          </View>
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.h2}>{t.experience}</Text>
          {data.experience.map((job, i) => (
            <View key={i} style={{ marginTop: 6 }}>
              <View style={styles.jobHeader}>
                <Text style={{ fontWeight: 'bold' }}>{job.title} — {job.company}</Text>
                <Text style={styles.sub}>&nbsp;{job.start}–{job.end} • {job.location}</Text>
              </View>
              <View style={{ marginTop: 4 }}>
                {job.bullets.map((b, j) => (
                  <View key={j} style={styles.li}>
                    <Text style={styles.bullet}>•</Text>
                    <Text>{b}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Projects */}
        <View style={styles.section}>
          <Text style={styles.h2}>{t.projects}</Text>
          <Text style={[styles.sub, { marginBottom: 4 }]}>{t.projectsNote}</Text>
          {data.projects.map((p, i) => (
            <View key={i} style={{ marginTop: 6 }}>
              <Text style={{ fontWeight: 'bold' }}>{p.name}</Text>
              <Text style={[styles.tiny, styles.sub]}>{p.role}</Text>
              <Text style={{ marginTop: 2 }}>{p.description}</Text>
              <View style={[styles.row, { marginTop: 3 }]}>
                {p.stack.map((s, k) => (<Text key={k} style={styles.badge}>{s}</Text>))}
              </View>
              <View style={[styles.row, { marginTop: 2 }]}>
                {p.live && p.live !== '(private)' ? <Text style={styles.sub}>Live: {p.live}</Text> : <Text style={styles.sub}>Live: {t.private}</Text>}
                <Text style={styles.sub}>•</Text>
                {p.repo && p.repo !== '(private)' ? <Text style={styles.sub}>Repo: {p.repo}</Text> : <Text style={styles.sub}>Repo: {t.private}</Text>}
              </View>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={[styles.section, { marginTop: 10 }]}>
          <Text style={styles.tiny}>{t.footerNote(data.name)}</Text>
        </View>
      </Page>
    </Document>
  );

  const instance = pdf(Doc);

  const toBlob = (instance as unknown as { toBlob?: () => Promise<Blob> }).toBlob;
  if (typeof toBlob === 'function') {
    const blob = await toBlob.call(instance);
    const ab = await blob.arrayBuffer();
    return new Response(new Uint8Array(ab), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Vasil_Vasilev_CV_${lang.toUpperCase()}.pdf"`,
        'Cache-Control': 'no-store',
      },
    });
  }

  const toBuffer = (instance as unknown as { toBuffer?: () => Promise<unknown> }).toBuffer;
  if (typeof toBuffer === 'function') {
    const result = await toBuffer.call(instance);

    if (isReadableLike(result)) {
      const chunks: Uint8Array[] = [];
      await new Promise<void>((resolve, reject) => {
        result.on('data', (chunk: unknown) => {
          if (typeof chunk === 'string') chunks.push(new TextEncoder().encode(chunk));
          else if (chunk instanceof Uint8Array) chunks.push(chunk);
          else if (chunk instanceof ArrayBuffer) chunks.push(new Uint8Array(chunk));
        });
        result.on('end', resolve);
        result.on('error', reject);
      });
      return new Response(concatU8(chunks), {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="Vasil_Vasilev_CV_${lang.toUpperCase()}.pdf"`,
          'Cache-Control': 'no-store',
        },
      });
    }

    if (result instanceof Uint8Array) {
      return new Response(result, { headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Vasil_Vasilev_CV_${lang.toUpperCase()}.pdf"`,
        'Cache-Control': 'no-store',
      }});
    }
    if (result instanceof ArrayBuffer) {
      return new Response(new Uint8Array(result), { headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Vasil_Vasilev_CV_${lang.toUpperCase()}.pdf"`,
        'Cache-Control': 'no-store',
      }});
    }
  }

  const toStringFn = (instance as unknown as { toString?: () => Promise<string> }).toString;
  const str = typeof toStringFn === 'function' ? await toStringFn.call(instance) : '%PDF-1.4\n%%EOF';
  return new Response(new TextEncoder().encode(str), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="Vasil_Vasilev_CV_${lang.toUpperCase()}.pdf"`,
      'Cache-Control': 'no-store',
    },
  });
}
