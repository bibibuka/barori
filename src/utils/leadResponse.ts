export async function requireLeadSuccess(response: Response): Promise<void> {
  const result = await response.json().catch(() => null);
  if (!response.ok || result?.success !== true) {
    throw new Error(typeof result?.message === 'string' ? result.message : `Заявка не принята сервером (HTTP ${response.status})`);
  }
}
