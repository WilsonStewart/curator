FROM rockylinux:9.3 AS base
RUN dnf update -y
RUN dnf install unzip -y

FROM base AS basewithbun
RUN curl -fsSL https://bun.com/install | bash -s "bun-v1.3.5"
ENV BUN_INSTALL="/root/.bun"
ENV PATH="$BUN_INSTALL/bin:$PATH"

FROM basewithbun AS dev

FROM dev AS devcontainer
RUN dnf install git zsh vim tmux dnf-plugins-core -y
RUN dnf config-manager --add-repo https://download.docker.com/linux/rhel/docker-ce.repo && dnf install docker-ce-cli -y
RUN curl -LsSf https://astral.sh/uv/install.sh | sh
ENV UV_INSTALL_DIR="/root/.local"
ENV PATH="$UV_INSTALL_DIR/bin:$PATH"
RUN uv tool install commitizen && uv tool upgrade commitizen
RUN dnf copr enable atim/lazygit -y
RUN dnf install lazygit -y
RUN curl https://raw.githubusercontent.com/jesseduffield/lazydocker/master/scripts/install_update_linux.sh | sh
RUN dnf copr enable atim/starship && dnf install starship -y
# ENV UV_INSTALL_DIR="/root/.local"
# ENV PATH="$UV_INSTALL_DIR/bin:$PATH"