FROM rockylinux:9.3 AS base
RUN dnf update -y
RUN dnf install unzip git -y
RUN curl -fsSL https://bun.com/install | bash -s "bun-v1.3.5"
ENV PATH="/root/.bun/bin:$PATH"
RUN curl -o- https://fnm.vercel.app/install | sh
RUN curl -fsSL https://rpm.nodesource.com/setup_24.x | bash - \
    && dnf install -y nodejs \
    && corepack enable pnpm \
    && corepack prepare pnpm@latest --activate

FROM base AS ci

FROM base AS devcontainer
RUN dnf install zsh vim tmux dnf-plugins-core -y
RUN dnf config-manager --add-repo https://download.docker.com/linux/rhel/docker-ce.repo && dnf install docker-ce-cli -y
RUN curl -LsSf https://astral.sh/uv/install.sh | sh
ENV UV_INSTALL_DIR="/root/.local"
ENV PATH="$UV_INSTALL_DIR/bin:$PATH"
RUN uv tool install commitizen && uv tool upgrade commitizen
RUN dnf copr enable atim/lazygit -y
RUN dnf install lazygit -y
RUN curl https://raw.githubusercontent.com/jesseduffield/lazydocker/master/scripts/install_update_linux.sh | sh
RUN dnf copr enable atim/starship -y && dnf install starship -y

# ENV UV_INSTALL_DIR="/root/.local"
# ENV PATH="$UV_INSTALL_DIR/bin:$PATH"

FROM base AS serverbunbuild
WORKDIR /build
RUN rm -rf /build
COPY \
    .npmrc \
    .gitignore \
    package.json \
    pnpm-lock.yaml \
    pnpm-workspace.yaml \
    /build/
COPY packages/curator-server /build/packages/curator-server
RUN pnpm install
WORKDIR /build/packages/curator-server
RUN pnpm run build


FROM base AS serverpnpmdeploy
WORKDIR /build
# RUN rm -rf /build
COPY \
    .npmrc \
    .gitignore \
    package.json \
    pnpm-lock.yaml \
    pnpm-workspace.yaml \
    /build/
COPY packages/curator-server /build/packages/curator-server
RUN pnpm --prod --filter curator-server deploy /build/deploy/curator-server


FROM redhat/ubi9-minimal:latest AS serverprod
WORKDIR /app
RUN microdnf update -y
RUN microdnf install unzip -y
RUN curl -fsSL https://bun.com/install | bash -s "bun-v1.3.5" \
    && microdnf remove unzip -y
ENV PATH="/root/.bun/bin:$PATH"
COPY --from=serverbunbuild /build/packages/curator-server/dist /app/
COPY --from=serverpnpmdeploy /build/deploy/curator-server/node_modules /app/node_modules